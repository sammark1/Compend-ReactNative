import React, { useContext, useState } from "react";
import { Text, Button } from "react-native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";

export const LocationDetail = ({
  route: {
    params: { location },
  },
  navigation,
}) => {
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const { campaign, saveCampaign, loadCampaign } = useContext(CampaignsContext);

  navigation.setOptions({ title: location.nickname });

  return (
    <SafeView>
      <Text>{location.name}</Text>
      <Text>{location.nickname}</Text>
      <Text>{location.type}</Text>
      <Text>{location.creationDate}</Text>
      <Text>{location.editedDate}</Text>

      <Button
        title="Edit"
        onPress={() => {
        //   navigation.navigate("Edit NPC", { NPC: NPC });
        }}
      />
      {/* {!isDeleteActive && (
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
              let NPCsList=campaign.NPCs;
              NPCsList.splice(NPC.index, 1)
              saveCampaign(campaign.id, JSON.stringify({...campaign, NPCs:NPCsList}))
              loadCampaign(campaign.id);
              setIsDeleteActive(false);
              navigation.navigate("NPCs List");

            }}
          />
        </>
      )} */}
    </SafeView>
  );
};
