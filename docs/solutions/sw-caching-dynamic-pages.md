# Service workers must never cache personalized dynamic pages

**What broke:** every page in the app (`/`, `/session`, `/progress`, `/flags`) is `force-dynamic`, per-user HTML — but the service worker used a stale-while-revalidate strategy on *every* GET, including navigations. Result: the streak visibly reset to 0 after finishing a session and reloading, and onboarding state reappeared for users who'd already set up a profile. On a shared device, one user's cached `/progress` (including their id) could even be served to the next.

**Why:** stale-while-revalidate is the right call for genuinely static assets (fonts, icons, hashed `/_next/static/*` bundles) and the wrong call for anything that renders differently per request. It's easy to write one `fetch` handler that treats all GETs the same and not notice, because the bug only shows up on a second visit — the first load always looks correct.

**The fix:** the fetch handler now explicitly bails out (`return`, let the network handle it) for navigations (`event.request.mode === "navigate"`) and for RSC data requests (`?_rsc=` in the query string), and only caches requests that pass an `isCacheableAsset()` allowlist (same-origin, under `/_next/static/` or a known static file extension). See `public/sw.js`.

**The reusable lesson:** a service worker's cache strategy has to be decided *per route*, not per app. Before writing a `fetch` handler, list which routes are genuinely static and which are personalized — if that list isn't obvious, the default should be "don't cache," not "cache everything and hope." This applies to any future route added to the app: a new `force-dynamic` page needs no SW changes (it's excluded by default), but a new *static* asset type needs adding to the allowlist deliberately, not assumed.
