import React, { useContext, useEffect } from "react";
import { Text, Button } from "react-native";

import { CampaignsContext } from "../../services/campaigns/campaigns.context";

export const CampaignDetail = ({ navigation }) => {
  const { campaign } = useContext(CampaignsContext);

  return (
    <>
      {campaign && (
        <>
          <Text>campaignDetail of {campaign.name}</Text>
          <Button title="NPCs" onPress={() => navigation.navigate("NPCs")} />
          <Button
            title="Locations"
            onPress={() => navigation.navigate("Locations")}
          />
          <Button
            title="Factions"
            onPress={() => navigation.navigate("Factions")}
          />
        </>
      )}
    </>
  );
};
