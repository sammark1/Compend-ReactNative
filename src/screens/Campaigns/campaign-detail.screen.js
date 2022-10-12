import React from "react";
import { Text } from "react-native";

export const CampaignDetail = ({route}) => {
    const campaign = route.params.campaign
//   const campaign = route.params.campaign;
  return (
  <Text>campaignDetail of {campaign.campaignName}</Text>
  );
};
