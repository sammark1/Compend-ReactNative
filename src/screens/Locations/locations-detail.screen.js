import React, { useContext, useState } from "react";
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
  const { campaign, saveCampaign, loadCampaign } = useContext(CampaignsContext);

  const getLocNPCs = () => {
    const pks = campaign.dataTables.location_NPC[location.pk];
    const NPCs = [];
    if (pks) {
      for (let i = 0; i < pks.length; i++) {
        NPCs.push(campaign.NPCs[pks[i]]);
      }
      return NPCs;
    }
  };

  getLocNPCs()
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
      <TagsList
        data={getLocNPCs()}
        renderItem={({ item, index }) => {
          return <Text>{item.givenName}</Text>;
        }}
        keyExtractor={(item, index) => `${index}_${item}`}
      ></TagsList>
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
              let locationsList = campaign.locations;
              locationsList.splice(location.index, 1);
              saveCampaign(
                campaign.id,
                JSON.stringify({ ...campaign, locations: locationsList })
              );
              loadCampaign(campaign.id);
              setIsDeleteActive(false);
              navigation.navigate("Locations List");
            }}
          />
        </>
      )}
    </SafeView>
  );
};
