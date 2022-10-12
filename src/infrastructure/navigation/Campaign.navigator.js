import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { NPCStack } from "./NPC.navigator";
import { Campaigns } from "../../screens/Campaigns/campaigns.screen";
import { NPCs } from "../../screens/NPCs/npc.screen";
import { Admin } from "../../screens/Admin/admin.screen";
import { CampaignDetail } from "../../screens/Campaigns/campaign-detail.screen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const createScreenOptions = () => {
  // const iconName = TAB_ICON[route.name];
  return {
    headerShown: false,
  };
};

export const CampaignNavigator = ({ route }) => {
  const campaign = route.params.campaign;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CampaignDetail"
        component={CampaignDetail}
        initialParams={{ campaign: campaign }}
      />
      <Stack.Screen name="NPCs" component={NPCs} />
    </Stack.Navigator>
  );
};
