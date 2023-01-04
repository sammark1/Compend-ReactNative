import React, { useContext } from "react";
import styled from "styled-components/native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";
import * as ListStyles from "../Common/components/Lists/Datalist-styles.component";
import { LocationListCard } from "../Common/components/Lists/ListCard.component";

const TempButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const TempButton = styled.Button``;

export const LocationsList = ({ navigation }) => {
  const { campaign, getDataRelationship } = useContext(CampaignsContext);
  //FIXME ANNOYING WARNING FROM FOLLOWING LINE
  // navigation.setOptions({ title: campaign.name+" Locations" });

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

      {campaign && (
        <>
          <ListStyles.List
            data={Object.values(campaign.locations)}
            renderItem={({ item, index }) => {
              return (
                <LocationListCard
                  item={item}
                  extras={getDataRelationship(item.residents).map(
                    (item) => `${item.givenName} `
                  )}
                  pressEvent={() => {
                    navigation.navigate("Location Detail", {
                      location: { ...item, index: index },
                    });
                  }}
                ></LocationListCard>
              );
            }}
            keyExtractor={(item, index) => `${index}_${item.name}`}
          />
        </>
      )}
    </SafeView>
  );
};
