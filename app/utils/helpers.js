// Convert Celsius to Fahrenheit
export const toFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32);

// Format Unix timestamp to readable date
export const formatDate = (unixTimestamp) => {
  return new Date(unixTimestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

// Format Unix timestamp to time
export const formatTime = (unixTimestamp) => {
  return new Date(unixTimestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Enhanced: Get weather background color based on condition
export const getWeatherColor = (condition) => {
  const c = condition?.toLowerCase();
  if (c?.includes("clear")) return "#FFB84D";
  if (c?.includes("cloud")) return "#90A4AE";
  if (c?.includes("rain")) return "#546E7A";
  if (c?.includes("snow")) return "#B3E5FC";
  if (c?.includes("thunder") || c?.includes("storm")) return "#424242";
  if (c?.includes("mist") || c?.includes("fog")) return "#78909C";
  return "#4A90E2";
};

// Get gradient colors based on weather condition
export const getWeatherGradient = (condition) => {
  const c = condition?.toLowerCase();
  if (c?.includes("clear")) return ["#FFB84D", "#FFAB36"];
  if (c?.includes("cloud")) return ["#90A4AE", "#78909C"];
  if (c?.includes("rain")) return ["#546E7A", "#455A64"];
  if (c?.includes("snow")) return ["#B3E5FC", "#81D4FA"];
  if (c?.includes("thunder") || c?.includes("storm"))
    return ["#424242", "#212121"];
  if (c?.includes("mist") || c?.includes("fog")) return ["#90A4AE", "#78909C"];
  return ["#4A90E2", "#2E7AB8"];
};

// Get weather icon name based on condition (for Feather icons)
export const getWeatherIcon = (condition) => {
  const c = condition?.toLowerCase();
  if (c?.includes("clear")) return "sun";
  if (c?.includes("cloud")) return "cloud";
  if (c?.includes("rain")) return "cloud-rain";
  if (c?.includes("snow")) return "cloud-snow";
  if (c?.includes("thunder")) return "zap";
  if (c?.includes("mist") || c?.includes("fog")) return "cloud";
  return "cloud-sun";
};

// Deprecated: Use getWeatherIcon instead
export const getWeatherEmoji = (condition) => {
  return getWeatherIcon(condition);
};

// Get temperature color (cold = blue, hot = red)
export const getTempColor = (temp) => {
  if (temp < 0) return "#64B5F6"; // Cold - Light Blue
  if (temp < 10) return "#42A5F5"; // Cool - Medium Blue
  if (temp < 20) return "#29B6F6"; // Comfortable - Cyan
  if (temp < 25) return "#66BB6A"; // Warm - Green
  if (temp < 30) return "#FFA726"; // Hot - Orange
  return "#EF5350"; // Very Hot - Red
};

// Format temperature with units
export const formatTemp = (temp, unit = "C") => {
  return `${Math.round(temp)}°${unit}`;
};

// Get wind speed description
export const getWindDescription = (speed) => {
  if (speed < 3) return "Calm";
  if (speed < 10) return "Light Breeze";
  if (speed < 20) return "Gentle Wind";
  if (speed < 30) return "Strong Wind";
  return "Very Strong Wind";
};

// Get humidity description
export const getHumidityLevel = (humidity) => {
  if (humidity < 30) return "Low";
  if (humidity < 60) return "Moderate";
  return "High";
};
