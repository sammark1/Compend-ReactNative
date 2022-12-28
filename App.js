import React from "react";
import "react-native-gesture-handler";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { useFonts } from "expo-font";

import { theme } from "./src/infrastructure/theme";
//REVIEW review relevance of next line
import { SaveContextProvider } from "./src/services/save/save.context";
import { AppNavigator } from "./src/infrastructure/navigation/app.navigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    AlmendraSC: require("./src/fonts/AlmendraSC-Regular.ttf"),
    CormInSBold: require("./src/fonts/CormorantInfant-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <SaveContextProvider>
          <AppNavigator />
        </SaveContextProvider>
      </ThemeProvider>
    </>
  );
}
