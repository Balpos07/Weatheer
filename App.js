import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { ThemeProvider, useTheme } from "./app/context/ThemeContext";
import ForecastScreen from "./app/screens/ForecastScreen";
import HomeScreen from "./app/screens/HomeScreen";
import SearchScreen from "./app/screens/SearchScreen";
import { getThemeColors } from "./constants/theme";

const Stack = createStackNavigator();

function RootNavigator() {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: "bold", color: colors.textPrimary },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              // Trigger theme toggle - we'll pass it through a different method
              const themeContext = useTheme();
              themeContext.toggleTheme();
            }}
            style={{ marginRight: 16 }}
          >
            <Feather
              name={isDarkMode ? "sun" : "moon"}
              size={22}
              color={colors.primary}
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "🌤 Weather App" }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "🔍 Search City" }}
      />
      <Stack.Screen
        name="Forecast"
        component={ForecastScreen}
        options={{ title: "📅 5-Day Forecast" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
