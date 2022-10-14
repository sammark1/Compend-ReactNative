import React, { useContext } from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { NPCsList } from "../../screens/NPCs/npcs-list.screen";
import { NPCCreate } from "../../screens/NPCs/npc.Create.Screen";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";

const Stack = createStackNavigator();

export const NPCStack = () => {
  const { campaign } = useContext(CampaignsContext);

  const getOptions = () => ({
    headerShown: true,
    title: `New NPC`,
  });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="NPCs List"
        component={NPCsList}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Create NPC"
        component={NPCCreate}
        options={getOptions()}
      />
    </Stack.Navigator>
  );
};
