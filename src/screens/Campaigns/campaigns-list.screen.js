import React, { useContext, useEffect, useState } from "react";
import { Button, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import { Card } from "react-native-paper";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { SaveContext } from "../../services/save/save.context";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";
import { Spacer } from "../../infrastructure/util/spacer.component";

export const CampaignsList = ({ navigation }) => {
  const { campaignsList, loadCampaignsList, campaign, loadCampaign } =
    useContext(CampaignsContext);
  const [campaigns, setCampaigns] = useState([]);

  const CampaignView = styled.View`
    flex: 1;
    background-color: dodgerblue;
  `;

  const CampaignList = styled(FlatList)`
    background-color: gold;
  `;

  const NPCCard = styled(Card)`
    background-color: white;
    margin-top: 2px;
  `;

  useEffect(() => {
    loadCampaignsList();
  }, []);

  useEffect(() => {
    if (campaignsList) {
      setCampaigns(Object.values(JSON.parse(campaignsList)));
      // console.log(Object.values(JSON.parse(campaignsList)));
    }
  }, [campaignsList]);

  const TempData = {
    dataID: 1,
    creationDate: new Date(),
    editedDate: new Date(),
    saveData: [
      {
        campaignName: "TestCampaign",
        creationDate: new Date(),
        editedDate: new Date(),
        NPCs: [],
      },
      {
        campaignName: "TestCampaign2",
        creationDate: new Date(),
        editedDate: new Date(),
        NPCs: [],
      },
    ],
  };

  return (
    <SafeView>
      <CampaignView>
        {campaigns.length ? (
          <>
            <CampaignList
              data={campaigns}
              renderItem={({ item, index }) => {
                return (
                  <NPCCard
                    mode=""
                    onPress={() => {
                      // selectCampaignIndex(index);
                      loadCampaign(item.id);
                      navigation.navigate("CampaignDetailNavigator");
                    }}
                  >
                    <Card.Title
                      title={item.name}
                      right={() => (
                        <Spacer location="right" size="large">
                          <Text>
                            {new Date(item.creationDate).getMonth() +
                              "/" +
                              new Date(item.creationDate).getDay() +
                              "/" +
                              new Date(item.creationDate).getFullYear()}
                          </Text>
                        </Spacer>
                      )}
                    />
                  </NPCCard>
                );
              }}
              keyExtractor={(item, index) => index+"_"+item.name}
            />
          </>
        ) : (
          <Text>No campaigns yet</Text>
        )}
      </CampaignView>
      <Button
        title="settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </SafeView>
  );
};
