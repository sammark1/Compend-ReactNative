import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { NPCStack } from "./NPC.navigator";
import { CampaignDetailNavigator } from "./Campaign-detail.navigator";
import { CampaignsList } from "../../screens/Campaigns/campaigns-list.screen";
import { NPCs } from "../../screens/NPCs/npcs-list.screen";
import { Admin } from "../../screens/Admin/admin.screen";
import { CampaignDetail } from "../../screens/Campaigns/campaign-detail.screen";
import { CampaignsContextProvider } from "../../services/campaigns/campaigns.context";

const Stack = createStackNavigator();

const Settings = () => {
  return <Text>Settings Screen</Text>;
};

export const AppNavigator = () => {
  return (
    <CampaignsContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Campaigns" component={CampaignsList} />
          <Stack.Screen
            name="Campaign Nav"
            component={CampaignDetailNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </CampaignsContextProvider>
  );
};
