import { lazy } from "react";
// import PriorityList from "../../Components/priority/PriorityList";

const PriorityList = lazy(() =>
  import("../../Components/priority/PriorityList")
);
export default function Priority() {
  return (
    <div>
      <PriorityList />
    </div>
  );
}
