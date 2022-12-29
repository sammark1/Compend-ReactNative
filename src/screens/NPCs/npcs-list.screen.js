import React, { useState, useContext, useEffect } from "react";
import { Text, Image, FlatList, Button } from "react-native";
import { Card, TextInput } from "react-native-paper";
import styled from "styled-components/native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { SaveContext } from "../../services/save/save.context";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const HeaderButton = styled.Pressable`
  margin: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-radius: ${({ theme }) => theme.spacing.xs};
`;

const ButtonText = styled.Text`
  font-family: CormInSBold;
  font-size:${({ theme }) => theme.sizes.point.md}
  color:${({ theme }) => theme.colors.text.primary}
`;

const NPCView = styled.View`
  flex: 1;
`;

const NPCCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.background.dark};
  margin-top: 2px;
`;

const NPCList = styled(FlatList)``;

export const NPCsList = ({ navigation }) => {
  const { campaign } = useContext(CampaignsContext);
  //FIXME ANNOYING WARNING FROM FOLLOWING LINE
  // navigation.setOptions({ title: campaign.name+" NPCs" });

  return (
    <SafeView>
      <ButtonsContainer>
        <HeaderButton
          // title="temp New NPC"
          onPress={() => {
            navigation.navigate("Create NPC");
          }}
        >
          <ButtonText>Create New NPC</ButtonText>
        </HeaderButton>
        <HeaderButton>
          <ButtonText>Search will go here</ButtonText>
        </HeaderButton>
      </ButtonsContainer>
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
              keyExtractor={(item, index) =>
                `${index}_${item.givenName}_${item.familyName}`
              }
            />
          </>
        )}
      </NPCView>
    </SafeView>
  );
};
