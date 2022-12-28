import React, { useContext, useEffect } from "react";
import { Text } from "react-native";
import styled from "styled-components";

import { CampaignsContext } from "../../services/campaigns/campaigns.context";
import { Screen } from "../../components/screen.component";
import { TitleBlock } from "./components/TitleBlock-component";
import { Button } from "react-native";

const Row = styled.Pressable`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.dark};
`;
const SpacerRow = styled.View`
  flex-direciton: row;
  align-items: center;
  height: 8px;
`;
const ColumnLabel = styled.View`
  flex: 1;
  align-items: flex-end;
  border-right-width: 2px;
  border-right-color: ${({ theme }) => theme.colors.accent.primary};
`;
const Column = styled.View`
  flex: 1;
`;

const BodyText = styled.Text`
  font-family: CormInSBold;
  font-size: ${({ theme }) => theme.sizes.point.md};
  padding: 8px;
`;

export const CampaignDetail = ({ navigation }) => {
  const { campaign } = useContext(CampaignsContext);

  return (
    <>
      {campaign && (
        <Screen>
          <TitleBlock title={campaign.name} />
          <Row onPress={() => navigation.navigate("NPCs")}>
            <ColumnLabel>
              <BodyText>NPCs</BodyText>
            </ColumnLabel>
            <Column>
              <BodyText>{Object.keys(campaign.NPCs).length}</BodyText>
            </Column>
          </Row>
          <SpacerRow>
            <ColumnLabel></ColumnLabel>
          </SpacerRow>
          <Row onPress={() => navigation.navigate("Locations")}>
            <ColumnLabel>
              <BodyText>Locations</BodyText>
            </ColumnLabel>
            <Column>
              <BodyText>{Object.keys(campaign.locations).length}</BodyText>
            </Column>
          </Row>
          <SpacerRow>
            <ColumnLabel></ColumnLabel>
          </SpacerRow>
          <Row onPress={() => navigation.navigate("Factions")}>
            <ColumnLabel>
              <BodyText>Factions</BodyText>
            </ColumnLabel>
            <Column>
              <BodyText>No Data Yet</BodyText>
            </Column>
          </Row>
          {/* <Row>
            <Column>
              <SButton onPress={() => navigation.navigate("NPCs")}>
                <BodyText>NPCs</BodyText>
              </SButton>
            </Column>
            <Column>
              <BodyText>{Object.keys(campaign.NPCs).length}</BodyText>
            </Column>
          </Row>
          <Row>
            <Column>
              <SButton onPress={() => navigation.navigate("Locations")}>
                <BodyText>Locations</BodyText>
              </SButton>
            </Column>
            <Column>
              <BodyText>{Object.keys(campaign.locations).length}</BodyText>
            </Column>
          </Row>
          <Row>
            <Column>
              <SButton onPress={() => navigation.navigate("Factions")}>
                <BodyText>Factions</BodyText>
              </SButton>
            </Column>
            <Column>
              <BodyText>NO DATA YET</BodyText>
            </Column>
          </Row> */}
        </Screen>
      )}
    </>
  );
};
