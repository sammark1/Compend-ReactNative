import React from "react";
import { Text, Button } from "react-native";

export const CampaignDetail = ({ route, navigation }) => {
  const campaign = route.params.campaign;
  //   const campaign = route.params.campaign;
  return (
    <>
      <Text>campaignDetail of {campaign.campaignName}</Text>
      <Button title="NPCs" onPress={()=>navigation.navigate("NPCs", {campaign:campaign})}/>
      <Button title="Locations" onPress={()=>navigation.navigate("Locations", {campaign:campaign})}/>
      <Button title="Factions" onPress={()=>navigation.navigate("Factions", {campaign:campaign})}/>
    </>
  );
};
