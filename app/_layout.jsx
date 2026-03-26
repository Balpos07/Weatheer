import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { getThemeColors } from "../constants/theme";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function RootLayout() {
  const { isDarkMode, toggleTheme } = useTheme();
  const colors = getThemeColors(isDarkMode);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: "bold", color: colors.textPrimary },
        headerRight: () => (
          <TouchableOpacity
            onPress={toggleTheme}
            style={{ marginRight: 16, padding: 8 }}
          >
            <Feather
              name={isDarkMode ? "sun" : "moon"}
              size={22}
              color={colors.primary}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "🌤 Weather App" }} />
      <Stack.Screen name="search" options={{ title: "🔍 Search City" }} />
      <Stack.Screen name="forecast" options={{ title: "📅 5-Day Forecast" }} />
    </Stack>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
}
