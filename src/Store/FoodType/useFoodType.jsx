import { useContext } from "react";
import { FoodType } from "../../context/Context";

export function useFoodType() {
  return useContext(FoodType);
}
