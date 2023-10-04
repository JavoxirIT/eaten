import { useContext } from "react";
import { SitiesAndDistrictContext } from "../../context/Context";

export function useCitiesAndDistrict() {
  return useContext(SitiesAndDistrictContext);
}
