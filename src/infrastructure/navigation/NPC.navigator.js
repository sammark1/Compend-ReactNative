import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { NPCs } from "../../screens/NPCs/npc.screen";
import { NPCCreate } from "../../screens/NPCs/npc.Create.Screen";

const Stack = createStackNavigator();

export const NPCStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NPCs List" component={NPCs}/>
      <Stack.Screen name="Create NPC" component={NPCCreate} />
    </Stack.Navigator>
  );
};
