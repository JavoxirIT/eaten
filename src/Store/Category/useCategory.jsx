import { Category } from "context/Context";
import { useContext } from "react";

export function useCategory() {
  return useContext(Category);
}
