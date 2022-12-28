import React, { useContext, useEffect } from "react";
import { Text, Button } from "react-native";
import styled from "styled-components";

import { CampaignsContext } from "../../services/campaigns/campaigns.context";
import { Screen } from "../../components/screen.component";
import { TitleBlock } from "./components/TitleBlock-component";

export const CampaignDetail = ({ navigation }) => {
  const { campaign } = useContext(CampaignsContext);

  return (
    <>
      {campaign && (
        <Screen>
          <TitleBlock title={campaign.name} />
          <Button title="NPCs" onPress={() => navigation.navigate("NPCs")} />
          <Button
            title="Locations"
            onPress={() => navigation.navigate("Locations")}
          />
          <Button
            title="Factions"
            onPress={() => navigation.navigate("Factions")}
          />
        </Screen>
      )}
    </>
  );
};
