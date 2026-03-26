import { ExpoRoot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}
