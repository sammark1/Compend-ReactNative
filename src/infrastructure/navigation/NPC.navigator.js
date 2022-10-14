import React, { useContext } from "react";
import { Button, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { NPCsList } from "../../screens/NPCs/npcs-list.screen";
import { NPCCreate } from "../../screens/NPCs/npc.Create.Screen";
import { NPCDetail } from "../../screens/NPCs/npc-detail.screen";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";

const Stack = createStackNavigator();

const UpdateNPC = () => {
  return <Text>UpdateNPC</Text>;
};

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
        name="NPC Detail"
        component={NPCDetail}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Create NPC"
        component={NPCCreate}
        options={getOptions()}
      />
      <Stack.Screen
        name="Update NPC"
        component={UpdateNPC}
        options={getOptions()}
      />
      {/* DELETE WILL BE HANDLED WITH A SWIPE + PUSH & || A NPC DETAIL CONFIRMATION */}
    </Stack.Navigator>
  );
};
