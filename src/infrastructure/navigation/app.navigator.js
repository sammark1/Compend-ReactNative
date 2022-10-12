import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { NPCStack } from "./NPC.navigator";
import { CampaignNavigator } from "./Campaign.navigator";
import { Campaigns } from "../../screens/Campaigns/campaigns.screen";
import { NPCs } from "../../screens/NPCs/npc.screen";
import { Admin } from "../../screens/Admin/admin.screen";
import { CampaignDetail } from "../../screens/Campaigns/campaign-detail.screen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const createScreenOptions = () => {
//   // const iconName = TAB_ICON[route.name];
//   return {
//     headerShown: false,
//   };
// };

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Campaigns" component={Campaigns} />
        <Stack.Screen name="Campaigns Nav" component={CampaignNavigator} options={{headerShown: false}}/>
      </Stack.Navigator>
      {/* <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen
          name="Campaigns"
          component={Campaigns}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
        />
        <Tab.Screen name="NPCs" component={NPCStack} />
        <Tab.Screen name="Admin" component={Admin} />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
};
