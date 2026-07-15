import { useEffect, useState } from "react";
import { Theme } from "@radix-ui/themes";

import { useAppSelector } from "@/store";

const getSystemAppearance = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const AppTheme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const appearanceConfig = useAppSelector(
    (state) => state.configs.appearance
  );
  const theme = appearanceConfig?.theme ?? "system";
  const accentColor = appearanceConfig?.accentColor ?? "gray";

  const [systemAppearance, setSystemAppearance] = useState(getSystemAppearance);

  // Track OS-level color scheme changes when theme is set to "system"
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => setSystemAppearance(getSystemAppearance());

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const appearance = theme === "system" ? systemAppearance : theme;

  // Sync a `.dark` class on <html> so Tailwind design tokens switch too
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", appearance === "dark");
    root.style.colorScheme = appearance;
  }, [appearance]);

  return (
    <Theme
      className="flex"
      appearance={appearance}
      accentColor={accentColor as any}
      grayColor="gray"
      radius="large"
      scaling="100%"
      panelBackground="solid"
    >
      {children}
    </Theme>
  );
};

export default AppTheme;
