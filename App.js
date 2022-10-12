import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";

import { theme } from "./src/infrastructure/theme";
import { SaveContextProvider } from "./src/services/save/save.context";
import { CampaignsContextProvider } from "./src/services/campaigns/campaigns.context";
import { AppNavigator } from "./src/infrastructure/navigation/app.navigator";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SaveContextProvider>
          <CampaignsContextProvider>
            <AppNavigator />
          </CampaignsContextProvider>
        </SaveContextProvider>
      </ThemeProvider>
    </>
  );
}
