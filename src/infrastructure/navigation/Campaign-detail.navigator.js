import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { NPCStack } from "./NPC.navigator";
import { Campaigns } from "../../screens/Campaigns/campaigns-list.screen";
import { NPCsList } from "../../screens/NPCs/npcs-list.screen";
import { Admin } from "../../screens/Admin/admin.screen";
import { CampaignDetail } from "../../screens/Campaigns/campaign-detail.screen";

const Stack = createStackNavigator();

const LocationsList = () => {
  return <Text>Locations List</Text>;
};

const FactionsList = () => {
  return <Text>Factions List</Text>;
};

export const CampaignDetailNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CampaignDetail"
        component={CampaignDetail}
      />
      <Stack.Screen name="NPCs" component={NPCsList} />
      <Stack.Screen name="Locations" component={LocationsList} />
      <Stack.Screen name="Factions" component={FactionsList} />
    </Stack.Navigator>
  );
};
