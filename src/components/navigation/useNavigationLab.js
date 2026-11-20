import { useContext } from "react";
import { NavigationLabContext } from "./NavigationLabContextDef";

export function useNavigationLab() {
  const context = useContext(NavigationLabContext);
  if (!context) {
    throw new Error("useNavigationLab must be used within a NavigationLabProvider");
  }
  return context;
}
export default useNavigationLab;
