import { describe, expect, it } from "vitest";
import { AVATAR_SCHEMES, DEFAULT_AVATAR_SCHEME, getAvatarScheme } from "./avatarSchemes";

describe("getAvatarScheme", () => {
  it("returns the matching scheme for a known id", () => {
    const scheme = AVATAR_SCHEMES[1];
    expect(getAvatarScheme(scheme.id)).toEqual(scheme);
  });

  it("falls back to DEFAULT_AVATAR_SCHEME for an unknown or stale id", () => {
    // 'coral' was a real stored value before the Site Diary redesign
    // renamed every scheme id - rows with it must not silently resolve to
    // whatever happens to be first in the array if that ever stops being
    // the default.
    const fallback = AVATAR_SCHEMES.find((s) => s.id === DEFAULT_AVATAR_SCHEME);
    expect(getAvatarScheme("coral")).toEqual(fallback);
  });
});
