import React, { useContext } from "react";
import { FlatList } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";

const TempButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const TempButton = styled.Button``;

const LocationView = styled.View`
  flex: 1;
  background-color: gold;
`;

const LocationCard = styled(Card)`
  background-color: white;
  margin-top: 2px;
`;

const LocationList = styled(FlatList)`
  background-color: lightgrey;
`;

export const LocationsList = ({ navigation }) => {
  const { campaign } = useContext(CampaignsContext);
  navigation.setOptions({ title: campaign.name+" Locations" });

  return (
    <SafeView>
      <TempButtonContainer>
        <TempButton
          title="temp New Location"
          onPress={() => {
            navigation.navigate("Location Create");
          }}
        />
      </TempButtonContainer>
      <LocationView>
        {campaign && (
          <>
            <LocationList
              data={Object.values(campaign.locations)}
              renderItem={({ item, index }) => {
                return (
                  <LocationCard
                    mode=""
                    onPress={() => {
                      navigation.navigate("Location Detail", {
                        location: { ...item, index: index },
                      });
                    }}
                  >
                    <Card.Title
                      title={item.name}
                      subtitle={item.nickname}
                    />
                  </LocationCard>
                );
              }}
              keyExtractor={(item, index) =>
                `${index}_${item.name}`
              }
            />
          </>
        )}
      </LocationView>
    </SafeView>
  );
};
