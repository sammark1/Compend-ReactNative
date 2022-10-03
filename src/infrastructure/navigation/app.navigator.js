import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {NPCs} from "../../screens/NPCs/npc.screen"
import {Admin} from "../../screens/Admin/admin.screen"

const Tab = createBottomTabNavigator();

const createScreenOptions = () => {
  // const iconName = TAB_ICON[route.name];
  return {
    headerShown: false,
  };
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen name="NPCs" component={NPCs} />
        <Tab.Screen name="Admin" component={Admin} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
