import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { CampaignDetailNavigator } from "./Campaign-detail.navigator";
import { CampaignsList } from "../../screens/Campaigns/campaigns-list.screen";
import { Admin } from "../../screens/Admin/admin.screen";
import { CampaignsContextProvider } from "../../services/campaigns/campaigns.context";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <CampaignsContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ title: "Campaigns" }}>
          <Stack.Screen name="Campaigns" component={CampaignsList} />
          <Stack.Screen
            name="CampaignDetailNavigator"
            component={CampaignDetailNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Settings" component={Admin} />
        </Stack.Navigator>
      </NavigationContainer>
    </CampaignsContextProvider>
  );
};
