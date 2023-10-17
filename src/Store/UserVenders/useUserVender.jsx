import { UserVender } from "context/Context";
import { useContext } from "react";

export function useUserVender() {
  return useContext(UserVender);
}
