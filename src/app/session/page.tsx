import { Suspense } from "react";
import { SessionView } from "./SessionView";

export default function SessionPage() {
  return (
    <Suspense fallback={null}>
      <SessionView />
    </Suspense>
  );
}
