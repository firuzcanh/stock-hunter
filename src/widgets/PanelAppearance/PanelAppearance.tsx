import type { ThemeMode } from "@/store/features/configs.slice";

import { useAppDispatch, useAppSelector } from "@/store";
import { ConfigActions } from "@/store/features/configs.slice";

import { SegmentedControl, Text, Tooltip } from "@radix-ui/themes";
import { CheckIcon } from "lucide-react";
import { Panel } from "@/components";
import { twMerge } from "tailwind-merge";

import { ACCENT_COLORS, THEME_MODES } from "@/constants/data";

const PanelAppearance: React.FC = () => {
  const dispatch = useAppDispatch();
  const appearanceConfig = useAppSelector(
    (state) => state.configs.appearance
  );
  const theme = appearanceConfig?.theme ?? "system";
  const accentColor = appearanceConfig?.accentColor ?? "gray";

  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>Appearance</Panel.Title>
      </Panel.Header>

      <Panel.Content>
        <div className="flex flex-col gap-5">
          {/* Theme */}
          <div className="flex flex-col gap-2">
            <Text size="2" color="gray">
              Theme
            </Text>
            <SegmentedControl.Root
              size="2"
              value={theme}
              onValueChange={(value) =>
                dispatch(ConfigActions.setTheme(value as ThemeMode))
              }
            >
              {THEME_MODES.map((mode) => (
                <SegmentedControl.Item key={mode.value} value={mode.value}>
                  {mode.label}
                </SegmentedControl.Item>
              ))}
            </SegmentedControl.Root>
          </div>

          {/* Accent color */}
          <div className="flex flex-col gap-2">
            <Text size="2" color="gray">
              Accent color
            </Text>
            <div className="flex flex-wrap gap-2.5">
              {ACCENT_COLORS.map((color) => {
                const isActive = accentColor === color.value;
                return (
                  <Tooltip key={color.value} content={color.label}>
                    <button
                      aria-label={color.label}
                      onClick={() =>
                        dispatch(ConfigActions.setAccentColor(color.value))
                      }
                      className={twMerge(
                        "flex items-center justify-center w-9 h-9 rounded-full border transition-transform",
                        "hover:scale-110 focus:outline-none",
                        isActive
                          ? "border-foreground ring-2 ring-foreground ring-offset-2 ring-offset-panel"
                          : "border-border"
                      )}
                      style={{ backgroundColor: color.swatch }}
                    >
                      {isActive ? (
                        <CheckIcon size="16" className="text-white drop-shadow" />
                      ) : null}
                    </button>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </div>
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelAppearance;
