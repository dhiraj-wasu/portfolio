import React from "react";
import { useNavigationLab } from "./useNavigationLab";
import NavFloatingDock from "./variations/NavFloatingDock";
import NavOSStyle from "./variations/NavOSStyle";

export default function DynamicNavigation({
  theme,
  toggleTheme,
  newConversation,
  isLegacyLayout = false,
}) {
  const { activeNav } = useNavigationLab();

  if (activeNav === "os" || activeNav === "os-style") {
    return (
      <NavOSStyle
        theme={theme}
        toggleTheme={toggleTheme}
        newConversation={newConversation}
        isLegacyLayout={isLegacyLayout}
      />
    );
  }

  return (
    <NavFloatingDock
      theme={theme}
      toggleTheme={toggleTheme}
      newConversation={newConversation}
      isLegacyLayout={isLegacyLayout}
    />
  );
}
