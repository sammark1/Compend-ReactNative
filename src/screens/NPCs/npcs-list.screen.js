import React, { useState, useContext, useEffect } from "react";
import { Text, Image, FlatList, Button } from "react-native";
import { Card, TextInput, Title, Paragraph } from "react-native-paper";
import styled from "styled-components/native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { SaveContext } from "../../services/save/save.context";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";
import * as ListStyles from "../Common/components/Lists/Datalist-styles.component";
import { NPCListCard } from "../Common/components/Lists/ListCard.component";

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const HeaderButton = styled.Pressable`
  margin: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.primaryDark};
  border-radius: ${({ theme }) => theme.spacing.xs};
`;

const ButtonText = styled.Text`
  font-family: CormInSBold;
  font-size:${({ theme }) => theme.sizes.point.md}
  color:${({ theme }) => theme.colors.text.primary}
`;

const SearchBar = styled.TextInput`
  flex: 1;
  margin: 0 ${({ theme }) => theme.spacing.sm}
    ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.primaryDark};
  border-radius: ${({ theme }) => theme.spacing.xs};
  font-family: CormInSBold;
  font-size: ${({ theme }) => theme.sizes.point.md};
`;

export const NPCsList = ({ navigation }) => {
  const { campaign, getDataRelationship } = useContext(CampaignsContext);

  const [searching, setSearching] = useState(false);
  //FIXME ANNOYING WARNING FROM FOLLOWING LINE
  // navigation.setOptions({ title: campaign.name+" NPCs" });

  return (
    <SafeView>
      <ButtonsContainer>
        <HeaderButton
          onPress={() => {
            navigation.navigate("Create NPC");
          }}
        >
          <ButtonText>Create New NPC</ButtonText>
        </HeaderButton>
        <HeaderButton
          onPress={() => {
            if (searching) {
              setSearching(false);
            } else {
              setSearching(true);
            }
          }}
        >
          <ButtonText>Search</ButtonText>
        </HeaderButton>
      </ButtonsContainer>
      {searching && (
        <ButtonsContainer>
          <SearchBar placeholder="Search"></SearchBar>
        </ButtonsContainer>
      )}

      {campaign && (
        <>
          <ListStyles.List
            data={Object.values(campaign.NPCs)}
            renderItem={({ item, index }) => {
              let residence = "";
              if (item.residence.linkKeys !== null) {
                residence = campaign.locations[item.residence.linkKeys].name;
              }
              return (
                <NPCListCard
                  item={item}
                  extras={residence}
                  mode=""
                  pressEvent={() => {
                    navigation.navigate("NPC Detail", {
                      NPC: { ...item, index: index },
                    });
                  }}
                ></NPCListCard>
              );
            }}
            keyExtractor={(item, index) =>
              `${index}_${item.givenName}_${item.familyName}`
            }
          />
        </>
      )}
    </SafeView>
  );
};
