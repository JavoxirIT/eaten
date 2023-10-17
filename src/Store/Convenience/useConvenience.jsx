import { Convenience } from "context/Context";
import { useContext } from "react";

export function useConvenience() {
  return useContext(Convenience);
}
