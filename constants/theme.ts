/**
 * Enhanced theme system for Weather App
 * Includes colors, fonts, gradients, and spacing
 * Supports both dark and light modes
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

// Theme modes
export const ThemeMode = {
  DARK: "dark",
  LIGHT: "light",
};

// Dark Mode Colors
export const COLORS_DARK = {
  // Primary Backgrounds
  bg: "#1a1a2e",
  card: "#16213e",
  cardLight: "#0f3460",

  // Text Colors
  textPrimary: "#ffffff",
  textSecondary: "rgba(255, 255, 255, 0.7)",
  textTertiary: "rgba(255, 255, 255, 0.5)",

  // Weather Condition Colors
  clear: "#FFB84D",
  cloudy: "#B0BEC5",
  rainy: "#546E7A",
  snow: "#E3F2FD",
  thunderstorm: "#424242",

  // Accent Colors
  primary: "#4A90E2",
  secondary: "#2ecc71",
  error: "#e74c3c",
  warning: "#f39c12",

  // UI Elements
  divider: "rgba(255, 255, 255, 0.1)",
  overlay: "rgba(0, 0, 0, 0.3)",
};

// Light Mode Colors
export const COLORS_LIGHT = {
  // Primary Backgrounds
  bg: "#f5f7fa",
  card: "#ffffff",
  cardLight: "#f0f2f5",

  // Text Colors
  textPrimary: "#1a1a2e",
  textSecondary: "rgba(26, 26, 46, 0.6)",
  textTertiary: "rgba(26, 26, 46, 0.4)",

  // Weather Condition Colors
  clear: "#FFB84D",
  cloudy: "#90A4AE",
  rainy: "#546E7A",
  snow: "#B3E5FC",
  thunderstorm: "#424242",

  // Accent Colors
  primary: "#4A90E2",
  secondary: "#2ecc71",
  error: "#e74c3c",
  warning: "#f39c12",

  // UI Elements
  divider: "rgba(26, 26, 46, 0.1)",
  overlay: "rgba(0, 0, 0, 0.1)",
};

// Helper function to get theme colors
export const getThemeColors = (isDark: boolean) => {
  return isDark ? COLORS_DARK : COLORS_LIGHT;
};

// Legacy COLORS export for compatibility
export const COLORS = COLORS_DARK;

// Weather-based Gradients
export const GRADIENTS = {
  clear: ["#FFB84D", "#FFAB36"],
  cloudy: ["#90A4AE", "#78909C"],
  rainy: ["#455A64", "#37474F"],
  snow: ["#B3E5FC", "#81D4FA"],
  thunderstorm: ["#424242", "#212121"],
  night: ["#0a0a1a", "#1a1a2e"],
};

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
