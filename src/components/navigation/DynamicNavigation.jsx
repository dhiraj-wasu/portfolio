import React from "react";
import { useNavigationLab } from "./useNavigationLab";
import NavBaseline from "./variations/NavBaseline";
import NavCommandBar from "./variations/NavCommandBar";
import NavFloatingDock from "./variations/NavFloatingDock";
import NavExploreDropdown from "./variations/NavExploreDropdown";
import NavEditorial from "./variations/NavEditorial";
import NavOSStyle from "./variations/NavOSStyle";
import NavBrewbitContextual from "./variations/NavBrewbitContextual";

export default function DynamicNavigation({
  theme,
  toggleTheme,
  newConversation,
  isLegacyLayout = false,
}) {
  const { activeNav } = useNavigationLab();

  switch (activeNav) {
    case "command-bar":
      return <NavCommandBar theme={theme} toggleTheme={toggleTheme} newConversation={newConversation} />;
    case "dock":
      return <NavFloatingDock theme={theme} toggleTheme={toggleTheme} newConversation={newConversation} />;
    case "explore":
      return <NavExploreDropdown theme={theme} toggleTheme={toggleTheme} newConversation={newConversation} />;
    case "editorial":
      return <NavEditorial theme={theme} toggleTheme={toggleTheme} newConversation={newConversation} />;
    case "os-style":
      return <NavOSStyle theme={theme} toggleTheme={toggleTheme} newConversation={newConversation} />;
    case "brewbit-context":
      return <NavBrewbitContextual theme={theme} toggleTheme={toggleTheme} newConversation={newConversation} />;
    case "baseline":
    default:
      return <NavBaseline theme={theme} toggleTheme={toggleTheme} newConversation={newConversation} />;
  }
}
