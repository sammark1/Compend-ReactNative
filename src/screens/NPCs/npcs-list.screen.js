import React, { useState, useContext, useEffect } from "react";
import { Text, Image, FlatList, Button } from "react-native";
import { Card, TextInput } from "react-native-paper";
import styled from "styled-components/native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { SaveContext } from "../../services/save/save.context";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";

const TempButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const TempButton = styled.Button``;

const NPCView = styled.View`
  flex: 1;
  background-color: gold;
`;

const NPCCard = styled(Card)`
  background-color: white;
  margin-top: 2px;
`;

const NPCList = styled(FlatList)`
  background-color: lightgrey;
`;

export const NPCsList = ({ navigation }) => {
  const { campaign } = useContext(CampaignsContext);
  //FIXME ANNOYING WARNING FROM FOLLOWING LINE
  // navigation.setOptions({ title: campaign.name+" NPCs" });

  return (
    <SafeView>
      <TempButtonContainer>
        <TempButton
          title="temp New NPC"
          onPress={() => {
            navigation.navigate("Create NPC");
          }}
        />
      </TempButtonContainer>
      <NPCView>
        {campaign && (
          <>
            <NPCList
              data={Object.values(campaign.NPCs)}
              renderItem={({ item, index }) => {
                return (
                  <NPCCard
                    mode=""
                    onPress={() => {
                      navigation.navigate("NPC Detail", {
                        NPC: { ...item, index: index },
                      });
                    }}
                  >
                    <Card.Title
                      title={item.givenName + " " + item.familyName}
                      subtitle={`${item.subrace} ${item.race} ${item.class}`}
                    />
                  </NPCCard>
                );
              }}
              keyExtractor={(item, index) => `${index}_${item.givenName}_${item.familyName}`}
            />
          </>
        )}
      </NPCView>
    </SafeView>
  );
};
