import { useContext } from "react";
import { FoodTypeContext } from "../../context/Context";

export function useFoodType() {
	return useContext(FoodTypeContext);
}
