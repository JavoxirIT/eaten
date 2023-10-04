import { useContext } from "react";
import { PriorityContext } from "../../context/Context";

export function usePriority() {
  return useContext(PriorityContext);
}
