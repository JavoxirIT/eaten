import { Suspense } from "react";
import { GlobalLoad } from "../../globalLoad/GlobalLoad";
export function OnSuspense({ children }) {
  return <Suspense fallback={<GlobalLoad />}>{children}</Suspense>;
}
// <h2>🌀 Loading...</h2>
