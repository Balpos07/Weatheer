import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getThemeColors } from "../../constants/theme";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { useTheme } from "../context/ThemeContext";
import { getWeatherByCity } from "../services/weatherApi";

export default function SearchScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      setWeather(null);
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch {
      setError("City not found. Check the spelling and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.bg }]}
    >
      <SearchBar onSearch={handleSearch} loading={loading} />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.primary }]}>
            Searching...
          </Text>
        </View>
      )}

      {error && (
        <View
          style={[
            styles.errorContainer,
            { backgroundColor: `${colors.error}15` },
          ]}
        >
          <Feather name="alert-circle" size={32} color={colors.error} />
          <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
        </View>
      )}

      {weather && (
        <>
          <WeatherCard weather={weather} />
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: colors.primary }]}
              onPress={() => router.push(`/forecast?city=${weather.name}`)}
            >
              <Feather name="calendar" size={20} color="#fff" />
              <Text style={styles.btnText}>See 5-Day Forecast</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                styles.btnSecondary,
                { backgroundColor: colors.card, borderColor: colors.primary },
              ]}
              onPress={() => setWeather(null)}
            >
              <Feather name="search" size={20} color={colors.primary} />
              <Text style={[styles.btnText, { color: colors.primary }]}>
                Search Another City
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {!loading && !weather && !error && (
        <View style={styles.emptyState}>
          <Feather name="search" size={64} color={colors.textTertiary} />
          <Text style={[styles.emptyText, { color: colors.textPrimary }]}>
            Search for a city
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Enter a city name to see the weather
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
  },
  errorContainer: {
    alignItems: "center",
    marginTop: 40,
    paddingVertical: 24,
    borderRadius: 16,
    marginHorizontal: -4,
  },
  error: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
  },
  actionContainer: {
    marginTop: 20,
    gap: 12,
  },
  btn: {
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnSecondary: {
    borderWidth: 1,
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
  },
});
