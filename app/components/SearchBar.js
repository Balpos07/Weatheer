import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
    Keyboard,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { getThemeColors } from "../../constants/theme";
import { useTheme } from "../context/ThemeContext";

export default function SearchBar({ onSearch, loading }) {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const [city, setCity] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    if (!city.trim()) return;
    Keyboard.dismiss();
    onSearch(city.trim());
  };

  const handleClear = () => {
    setCity("");
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.card, borderColor: colors.cardLight },
          isFocused && {
            backgroundColor: `${colors.primary}08`,
            borderColor: colors.primary,
          },
        ]}
      >
        <Feather
          name="search"
          size={20}
          color={isFocused ? colors.primary : colors.textTertiary}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          placeholder="Search for a city..."
          placeholderTextColor={colors.textTertiary}
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handlePress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="search"
          editable={!loading}
        />
        {city.length > 0 && (
          <TouchableOpacity onPress={handleClear} disabled={loading}>
            <Feather name="x" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colors.primary },
          loading && styles.buttonDisabled,
        ]}
        onPress={handlePress}
        disabled={loading || !city.trim()}
      >
        <Feather
          name={loading ? "loader" : "arrow-right"}
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#16213e",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
    transition: "all 0.3s ease",
  },
  inputContainerFocused: {
    borderColor: "#4A90E2",
    backgroundColor: "rgba(74, 144, 226, 0.05)",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#4A90E2",
    borderRadius: 16,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: "rgba(74, 144, 226, 0.5)",
    shadowOpacity: 0,
    elevation: 0,
  },
});
