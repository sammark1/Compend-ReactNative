import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LocationsList } from "../../screens/Locations/locations-list.screen";
import { LocationDetail } from "../../screens/Locations/locations-detail.screen";
import { LocationCreate } from "../../screens/Locations/location-create.screen";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";

const Stack = createStackNavigator();

export const LocationsStack = () => {
  const { campaign } = useContext(CampaignsContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Locations List"
        component={LocationsList}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Location Detail"
        component={LocationDetail}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Location Create"
        component={LocationCreate}
        options={{ headerShown: true }}
      />
      {/* DELETE WILL BE HANDLED WITH A SWIPE + PUSH & || A NPC DETAIL CONFIRMATION */}
    </Stack.Navigator>
  );
};
