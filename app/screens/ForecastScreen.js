import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import ForecastItem from "../components/ForecastItem";
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../../constants/theme";
import { getForecastByCity } from "../services/weatherApi";

export default function ForecastScreen() {
  const { city } = useLocalSearchParams();
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  if (!city) {
    return (
      <View style={[styles.center, { backgroundColor: colors.bg }]}>
        <Feather name="alert-circle" size={64} color={colors.error} />
        <Text style={[styles.error, { color: colors.error }]}>No city selected</Text>
      </View>
    );
  }

  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadForecast();
  }, []);

  const loadForecast = async () => {
    try {
      const data = await getForecastByCity(city);
      // Filter to one reading per day at noon
      if (data?.list && Array.isArray(data.list)) {
        const daily = data.list.filter((item) =>
          item.dt_txt.includes("12:00:00"),
        );
        setForecast(daily);
      } else {
        setError("Invalid forecast data received");
      }
    } catch (err) {
      setError("Could not load forecast. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.primary }]}>Loading forecast...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.bg }]}>
        <Feather name="alert-circle" size={64} color={colors.error} />
        <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
      </View>
    );
  }

  if (forecast.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.bg }]}>
        <Feather name="calendar" size={64} color={colors.textTertiary} />
        <Text style={[styles.error, { color: colors.textSecondary }]}>No forecast data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.titleContainer, { borderBottomColor: colors.divider }]}>
        <Feather name="calendar" size={28} color={colors.primary} />
        <View style={styles.titleText}>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>5-Day Forecast for</Text>
          <Text style={[styles.title, { color: colors.textPrimary }]}>{city}</Text>
        </View>
      </View>

      <View style={styles.forecastList}>
        {forecast.map((item, index) => (
          <ForecastItem 
            key={item.dt.toString()} 
            item={item}
            index={index}
          />
        ))}
      </View>

      <View style={[styles.footer, { borderTopColor: colors.divider }]}>
        <Text style={[styles.footerText, { color: colors.textTertiary }]}>
          💡 Forecasts are based on hourly data aggregated at noon
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: "500",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  titleText: {
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 2,
  },
  error: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
  },
  forecastList: {
    gap: 12,
  },
  footer: {
    marginTop: 32,
    paddingVertical: 16,
    alignItems: "center",
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 12,
  },
});

  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadForecast();
  }, []);

  const loadForecast = async () => {
    try {
      const data = await getForecastByCity(city);
      // Filter to one reading per day at noon
      if (data?.list && Array.isArray(data.list)) {
        const daily = data.list.filter((item) =>
          item.dt_txt.includes("12:00:00"),
        );
        setForecast(daily);
      } else {
        setError("Invalid forecast data received");
      }
    } catch (err) {
      setError("Could not load forecast. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading forecast...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Feather name="alert-circle" size={64} color="#e74c3c" />
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (forecast.length === 0) {
    return (
      <View style={styles.center}>
        <Feather name="calendar" size={64} color="rgba(255, 255, 255, 0.3)" />
        <Text style={styles.error}>No forecast data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Feather name="calendar" size={28} color="#FFB84D" />
        <View style={styles.titleText}>
          <Text style={styles.subtitle}>5-Day Forecast for</Text>
          <Text style={styles.title}>{city}</Text>
        </View>
      </View>

      <View style={styles.forecastList}>
        {forecast.map((item, index) => (
          <ForecastItem key={item.dt.toString()} item={item} index={index} />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Forecasts are based on hourly data aggregated at noon
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a1a2e",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a2e",
    padding: 20,
  },
  loadingText: {
    color: "#4A90E2",
    marginTop: 16,
    fontSize: 14,
    fontWeight: "500",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  titleText: {
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginTop: 2,
  },
  error: {
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
  },
  forecastList: {
    gap: 12,
  },
  footer: {
    marginTop: 32,
    paddingVertical: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
  },
});
