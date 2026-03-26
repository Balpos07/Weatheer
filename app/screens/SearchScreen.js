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
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { getWeatherByCity } from "../services/weatherApi";

export default function SearchScreen() {
  const router = useRouter();
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
    <ScrollView contentContainerStyle={styles.container}>
      <SearchBar onSearch={handleSearch} loading={loading} />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Feather name="alert-circle" size={32} color="#e74c3c" />
          <Text style={styles.error}>{error}</Text>
        </View>
      )}

      {weather && (
        <>
          <WeatherCard weather={weather} />
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => router.push(`/forecast?city=${weather.name}`)}
            >
              <Feather name="calendar" size={20} color="#fff" />
              <Text style={styles.btnText}>See 5-Day Forecast</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnSecondary]}
              onPress={() => setWeather(null)}
            >
              <Feather name="search" size={20} color="#fff" />
              <Text style={styles.btnText}>Search Another City</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {!loading && !weather && !error && (
        <View style={styles.emptyState}>
          <Feather name="search" size={64} color="rgba(255, 255, 255, 0.3)" />
          <Text style={styles.emptyText}>Search for a city</Text>
          <Text style={styles.emptySubtext}>
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
    backgroundColor: "#1a1a2e",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  loadingText: {
    color: "#4A90E2",
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
  },
  errorContainer: {
    alignItems: "center",
    marginTop: 40,
    paddingVertical: 24,
    backgroundColor: "rgba(231, 76, 60, 0.1)",
    borderRadius: 16,
    marginHorizontal: -4,
  },
  error: {
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
  },
  actionContainer: {
    marginTop: 20,
    gap: 12,
  },
  btn: {
    backgroundColor: "#4A90E2",
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
    backgroundColor: "#16213e",
    borderWidth: 1,
    borderColor: "#4A90E2",
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  emptySubtext: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 14,
    marginTop: 8,
  },
});
