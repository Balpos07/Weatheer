import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import {
    formatDate,
    getTempColor,
    getWeatherColor,
    getWeatherIcon,
} from "../utils/helpers";

export default function ForecastItem({ item, index }) {
  if (!item || !item.main || !item.weather || !item.weather[0]) {
    return null;
  }

  const iconName = getWeatherIcon(item.weather[0].description);
  const bgColor = getWeatherColor(item.weather[0].description);
  const tempColor = getTempColor(item.main.temp);

  return (
    <View style={[styles.container, { borderLeftColor: bgColor }]}>
      <View style={styles.dateContainer}>
        <Text style={styles.dayNumber}>{index + 1}</Text>
        <View>
          <Text style={styles.date}>{formatDate(item.dt)}</Text>
          <Text style={styles.weekday}>
            {new Date(item.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </Text>
        </View>
      </View>

      <View style={styles.iconContainer}>
        <View style={[styles.iconBg, { backgroundColor: bgColor }]}>
          <Feather name={iconName} size={32} color="#fff" />
        </View>
      </View>

      <View style={styles.descContainer}>
        <Text style={styles.desc}>{item.weather[0].description}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailSmall}>
            <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>{item.main.humidity}%</Text>
          </View>
          <View style={styles.detailSmall}>
            <Text style={styles.detailLabel}>Wind</Text>
            <Text style={styles.detailValue}>{item.wind.speed} m/s</Text>
          </View>
        </View>
      </View>

      <View style={styles.tempContainer}>
        <View style={styles.tempBox}>
          <Text style={styles.tempLabel}>Low</Text>
          <Text style={styles.tempValue}>
            {Math.round(item.main.temp_min)}°
          </Text>
        </View>
        <View style={styles.tempDivider} />
        <View style={styles.tempBox}>
          <Text style={styles.tempLabel}>High</Text>
          <Text style={[styles.tempValue, { color: tempColor }]}>
            {Math.round(item.main.temp)}°
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16213e",
    borderRadius: 16,
    padding: 14,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    minWidth: 80,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4A90E2",
    width: 32,
    textAlign: "center",
  },
  date: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  weekday: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 11,
    marginTop: 2,
  },
  iconContainer: {
    marginHorizontal: 10,
  },
  iconBg: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  descContainer: {
    flex: 1.2,
    marginHorizontal: 10,
  },
  desc: {
    color: "rgba(255, 255, 255, 0.8)",
    textTransform: "capitalize",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: "row",
    gap: 10,
  },
  detailSmall: {
    flex: 1,
  },
  detailLabel: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 9,
  },
  detailValue: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    padding: 8,
    minWidth: 90,
  },
  tempBox: {
    flex: 1,
    alignItems: "center",
  },
  tempLabel: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 9,
    fontWeight: "600",
  },
  tempValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 2,
  },
  tempDivider: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginHorizontal: 4,
  },
});
