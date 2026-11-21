import React from "react";
import { useNavigationLab } from "./useNavigationLab";
import NavFloatingDock from "./variations/NavFloatingDock";
import NavOSStyle from "./variations/NavOSStyle";

export default function DynamicNavigation({
  theme,
  toggleTheme,
  newConversation,
  onPromptChat,
  isLegacyLayout = false,
}) {
  const { activeNav } = useNavigationLab();

  if (activeNav === "os" || activeNav === "os-style") {
    return (
      <NavOSStyle
        theme={theme}
        toggleTheme={toggleTheme}
        newConversation={newConversation}
        onPromptChat={onPromptChat}
        isLegacyLayout={isLegacyLayout}
      />
    );
  }

  return (
    <>
      <NavFloatingDock
        theme={theme}
        toggleTheme={toggleTheme}
        newConversation={newConversation}
        onPromptChat={onPromptChat}
        isLegacyLayout={isLegacyLayout}
      />
      {!isLegacyLayout && <div className="floating-header-spacer" aria-hidden="true" />}
    </>
  );
}
