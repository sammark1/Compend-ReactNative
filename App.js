import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";

import { theme } from "./src/infrastructure/theme";
import { AppNavigator } from "./src/infrastructure/navigation/app.navigator";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppNavigator/>
      </ThemeProvider>
    </>
  );
}
