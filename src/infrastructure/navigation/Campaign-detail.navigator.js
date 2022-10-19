import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { NPCStack } from "./NPC.navigator";
import { Campaigns } from "../../screens/Campaigns/campaigns-list.screen";
import { NPCsList } from "../../screens/NPCs/npcs-list.screen";
import { LocationsStack } from "./Locations.navigator";
import { Admin } from "../../screens/Admin/admin.screen";
import { CampaignDetail } from "../../screens/Campaigns/campaign-detail.screen";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";
import { useContext } from "react";

const Stack = createStackNavigator();

// const LocationsList = () => {
//   return <Text>Locations List</Text>;
// };

const FactionsList = () => {
  return <Text>Factions List</Text>;
};

export const CampaignDetailNavigator = () => {
  const { campaign } = useContext(CampaignsContext);

  const getScreenOptions = () => ({
    headerShown: true,
    title: `${campaign ? campaign.name : "Campaign"}`,
  });

  return (
    <Stack.Navigator screenOptions={getScreenOptions()}>
      <Stack.Screen name="CampaignDetail" component={CampaignDetail} />
      <Stack.Screen
        name="NPCs"
        component={NPCStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Locations"
        component={LocationsStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Factions" component={FactionsList} />
    </Stack.Navigator>
  );
};
