import React, { useState, useContext, useEffect } from "react";
import { Text, Image, FlatList, Button } from "react-native";
import { Card, TextInput } from "react-native-paper";
import styled from "styled-components/native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { SaveContext } from "../../services/save/save.context";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";

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

  return (
    <SafeView>
      <Button
        title="temp New NPC"
        onPress={() => {
          navigation.navigate("Create NPC");
        }}
      />
      <NPCView>
        {campaign && (
          <>
            <NPCList
              data={campaign.NPCs}
              renderItem={({ item }) => {
                return (
                  <NPCCard mode="">
                    <Card.Title
                      title={item.givenName + " " + item.familyName}
                      subtitle={`${item.subrace} ${item.race} ${item.class}`}
                    />
                  </NPCCard>
                );
              }}
              keyExtractor={(item) => item.givenName + " " + item.familyName}
            />
          </>
        )}
      </NPCView>
    </SafeView>
  );
};
