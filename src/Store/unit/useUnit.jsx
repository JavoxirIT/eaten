import { useContext } from "react";
import { UnitContext } from "../../context/Context";

export function useUnit() {
  return useContext(UnitContext);
}
