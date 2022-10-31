import React, { useContext, useEffect, useState } from "react";
import { Text, Button, FlatList } from "react-native";
import styled from "styled-components";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";

const TagsList = styled(FlatList)`
  background-color: dodgerblue;
`;

export const LocationDetail = ({
  route: {
    params: { location },
  },
  navigation,
}) => {
  navigation.setOptions({ title: location.nickname });
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const {
    campaign,
    saveCampaign,
    loadCampaign,
    getDataRelationship,
    relatedData,
  } = useContext(CampaignsContext);

  useEffect(() => {
    getDataRelationship(location.residents);
  }, []);

  return (
    <SafeView>
      <Text>{location.name}</Text>
      <Text>{location.nickname}</Text>
      <Text>{location.type}</Text>
      <TagsList
        data={location.tags}
        renderItem={({ item, index }) => {
          return <Text>{item}</Text>;
        }}
        keyExtractor={(item, index) => `${index}_${item}`}
      ></TagsList>
      {relatedData && (
        <FlatList
          data={relatedData}
          renderItem={({ item, index }) => {
            return (
              <Text
                onPress={() => {
                  navigation.navigate("NPC Detail", { NPC: item });
                }}
              >
                {item.givenName}
              </Text>
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        ></FlatList>
      )}
      <Text>{location.creationDate}</Text>
      <Text>{location.editedDate}</Text>

      <Button
        title="Edit"
        onPress={() => {
          navigation.navigate("Location Edit", { location: location });
        }}
      />
      {!isDeleteActive && (
        <Button
          title="Delete"
          onPress={() => {
            setIsDeleteActive(true);
          }}
        />
      )}
      {isDeleteActive && (
        <>
          <Button
            title="Cancel"
            onPress={() => {
              setIsDeleteActive(false);
            }}
          />
          <Button
            title="Confirm Delete"
            onPress={() => {
              let locationsData = campaign.locations;
              delete locationsData[location.pk];
              saveCampaign(
                campaign.id,
                JSON.stringify({ ...campaign, locations: locationsData })
              );
              loadCampaign(campaign.id);
              setIsDeleteActive(false);
              navigation.navigate("Locations");
            }}
          />
        </>
      )}
    </SafeView>
  );
};
