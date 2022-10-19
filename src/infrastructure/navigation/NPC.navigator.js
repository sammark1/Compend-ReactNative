import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { NPCsList } from "../../screens/NPCs/npcs-list.screen";
import { NPCCreate } from "../../screens/NPCs/npc.Create.Screen";
import { NPCDetail } from "../../screens/NPCs/npc-detail.screen";
import { NPCEdit } from "../../screens/NPCs/npc-edit.screen";

const Stack = createStackNavigator();

export const NPCStack = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="NPCs List"
        component={NPCsList}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="NPC Detail"
        component={NPCDetail}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Create NPC"
        component={NPCCreate}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Edit NPC"
        component={NPCEdit}
        options={{ headerShown: true }}
      />
      {/* DELETE WILL BE HANDLED WITH A SWIPE + PUSH & || A NPC DETAIL CONFIRMATION */}
    </Stack.Navigator>
  );
};
