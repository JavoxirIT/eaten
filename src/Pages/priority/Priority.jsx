import { lazy } from "react";
const PriorityList = lazy(() =>
  import("../../Components/priority/PriorityList")
);
export default function Priority() {
  return <PriorityList />;
}
