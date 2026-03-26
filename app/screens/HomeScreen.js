import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import WeatherCard from "../components/WeatherCard";
import { getWeatherByCoords } from "../services/weatherApi";
import { formatTime } from "../utils/helpers";

export default function HomeScreen() {
  const router = useRouter();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLocationWeather();
  }, []);

  const fetchLocationWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission denied. Please use Search instead.");
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const data = await getWeatherByCoords(latitude, longitude);
      setWeather(data);
    } catch (err) {
      setError("Could not fetch weather. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Feather name="alert-circle" size={64} color="#e74c3c" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.btn} onPress={fetchLocationWeather}>
          <Feather name="rotate-cw" size={20} color="#fff" />
          <Text style={styles.btnText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnSecondary]}
          onPress={() => router.push("/search")}
        >
          <Feather name="search" size={20} color="#fff" />
          <Text style={styles.btnText}>Search City</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Weather Card */}
      {weather && <WeatherCard weather={weather} />}

      {/* Sunrise & Sunset Section */}
      {weather && weather.sys && (
        <View style={styles.sunSection}>
          <Text style={styles.sectionTitle}>Sun Activity</Text>
          <View style={styles.sunRow}>
            <View style={[styles.sunItem, styles.sunLeft]}>
              <View style={styles.sunIconContainer}>
                <Feather name="sunrise" size={28} color="#FFB84D" />
              </View>
              <View>
                <Text style={styles.sunLabel}>Sunrise</Text>
                <Text style={styles.sunTime}>
                  {formatTime(weather.sys.sunrise)}
                </Text>
              </View>
            </View>
            <View style={styles.sunDivider} />
            <View style={[styles.sunItem, styles.sunRight]}>
              <View style={styles.sunIconContainer}>
                <Feather name="sunset" size={28} color="#FF6B6B" />
              </View>
              <View>
                <Text style={styles.sunLabel}>Sunset</Text>
                <Text style={styles.sunTime}>
                  {formatTime(weather.sys.sunset)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.push("/search")}
        >
          <Feather name="search" size={20} color="#fff" />
          <Text style={styles.btnText}>Search Another City</Text>
        </TouchableOpacity>

        {weather && weather.name && (
          <TouchableOpacity
            style={[styles.btn, styles.btnSecondary]}
            onPress={() => router.push(`/forecast?city=${weather.name}`)}
          >
            <Feather name="calendar" size={20} color="#fff" />
            <Text style={styles.btnText}>5-Day Forecast</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.btn, styles.btnRefresh]}
          onPress={fetchLocationWeather}
        >
          <Feather name="rotate-cw" size={20} color="#fff" />
          <Text style={styles.btnText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Tip: Swipe left to explore more features
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#1a1a2e",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#1a1a2e",
  },
  loadingText: {
    color: "#4A90E2",
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  sunSection: {
    marginVertical: 24,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    marginLeft: 4,
  },
  sunRow: {
    flexDirection: "row",
    backgroundColor: "#16213e",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sunItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
  },
  sunLeft: {
    paddingRight: 8,
  },
  sunRight: {
    paddingLeft: 8,
  },
  sunIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  sunLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
  },
  sunTime: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 2,
  },
  sunDivider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  buttonSection: {
    marginTop: 24,
    gap: 12,
  },
  btn: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    paddingHorizontal: 30,
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
  btnRefresh: {
    backgroundColor: "#2ecc71",
    shadowColor: "#2ecc71",
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  footer: {
    marginTop: 32,
    paddingVertical: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
  },
});
