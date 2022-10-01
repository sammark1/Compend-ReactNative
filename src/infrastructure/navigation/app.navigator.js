import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {NPCs} from "../../screens/NPCs/npc.screen"

import {SafeView} from "../util/safe-area.component"

const Tab = createBottomTabNavigator();

const createScreenOptions = () => {
  // const iconName = TAB_ICON[route.name];
  return {
    headerShown: false,
  };
};

//FIXME temporary component
// const NPCs = () => (
//   <SafeView>
//     <Text>NPCs</Text>
//   </SafeView>
// );

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen name="NPCs" component={NPCs} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
