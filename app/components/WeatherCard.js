import { Feather, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { getThemeColors } from "../../constants/theme";
import { useTheme } from "../context/ThemeContext";
import {
    getHumidityLevel,
    getTempColor,
    getWeatherColor,
    getWeatherIcon,
    getWindDescription,
} from "../utils/helpers";

export default function WeatherCard({ weather }) {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  if (
    !weather ||
    !weather.weather ||
    !weather.sys ||
    !weather.main ||
    !weather.wind
  ) {
    return null;
  }

  const condition = weather.weather[0]?.description || "Unknown";
  const iconName = getWeatherIcon(condition);
  const tempColor = getTempColor(weather.main.temp);
  const windDesc = getWindDescription(weather.wind.speed);
  const humidityLevel = getHumidityLevel(weather.main.humidity);

  return (
    <View
      style={[styles.card, { backgroundColor: getWeatherColor(condition) }]}
    >
      {/* Header: Location & Icon */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.city}>
            {weather.name}, {weather.sys.country}
          </Text>
          <Text style={styles.desc}>{condition}</Text>
        </View>
        <Feather
          name={iconName}
          size={80}
          color="#fff"
          style={styles.iconContainer}
        />
      </View>

      {/* Main Temperature */}
      <View style={styles.tempSection}>
        <Text style={[styles.temp, { color: tempColor }]}>
          {Math.round(weather.main.temp)}°C
        </Text>
        <Text style={styles.feelsLike}>
          Feels like {Math.round(weather.main.feels_like)}°C
        </Text>
      </View>

      {/* Details Grid */}
      <View style={styles.detailsGrid}>
        {/* Humidity */}
        <View style={styles.detailCard}>
          <View style={styles.detailIconContainer}>
            <Feather name="droplets" size={24} color="#4A90E2" />
          </View>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
          <Text style={styles.detailSubtext}>{humidityLevel}</Text>
        </View>

        {/* Wind */}
        <View style={styles.detailCard}>
          <View style={styles.detailIconContainer}>
            <Feather name="wind" size={24} color="#2ecc71" />
          </View>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
          <Text style={styles.detailSubtext}>{windDesc}</Text>
        </View>

        {/* Pressure */}
        <View style={styles.detailCard}>
          <View style={styles.detailIconContainer}>
            <MaterialIcons name="speed" size={24} color="#f39c12" />
          </View>
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailValue}>{weather.main.pressure} hPa</Text>
          <Text style={styles.detailSubtext}>
            {weather.main.pressure > 1013 ? "High" : "Low"}
          </Text>
        </View>

        {/* Visibility */}
        {weather.visibility && (
          <View style={styles.detailCard}>
            <View style={styles.detailIconContainer}>
              <Feather name="eye" size={24} color="#9B59B6" />
            </View>
            <Text style={styles.detailLabel}>Visibility</Text>
            <Text style={styles.detailValue}>
              {(weather.visibility / 1000).toFixed(1)} km
            </Text>
            <Text style={styles.detailSubtext}>
              {weather.visibility > 10000 ? "Clear" : "Limited"}
            </Text>
          </View>
        )}
      </View>

      {/* Min/Max Temperatures */}
      <View style={styles.minMaxRow}>
        <View style={styles.minMaxItem}>
          <Text style={styles.minMaxLabel}>Low</Text>
          <Text style={styles.minMaxValue}>
            {Math.round(weather.main.temp_min)}°C
          </Text>
        </View>
        <View style={styles.dividerVertical} />
        <View style={styles.minMaxItem}>
          <Text style={styles.minMaxLabel}>High</Text>
          <Text style={styles.minMaxValue}>
            {Math.round(weather.main.temp_max)}°C
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  city: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    textTransform: "capitalize",
  },
  iconContainer: {
    marginLeft: 12,
  },
  tempSection: {
    alignItems: "center",
    marginVertical: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 16,
  },
  temp: {
    fontSize: 72,
    fontWeight: "200",
    color: "#fff",
  },
  feelsLike: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  detailCard: {
    width: "48%",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  detailIconContainer: {
    marginBottom: 8,
  },
  detailLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  detailValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  detailSubtext: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    marginTop: 2,
  },
  minMaxRow: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 16,
    paddingVertical: 12,
    marginTop: 12,
  },
  minMaxItem: {
    flex: 1,
    alignItems: "center",
  },
  minMaxLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    marginBottom: 4,
  },
  minMaxValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  dividerVertical: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
});
