import React, { useContext, useState } from "react";
import { Text, Button, View } from "react-native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";

export const NPCDetail = ({
  route: {
    params: { NPC },
  },
  navigation,
}) => {
  const NPCName = NPC.givenName + " " + NPC.familyName;
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const { campaign, saveCampaign, loadCampaign } = useContext(CampaignsContext);

  navigation.setOptions({ title: NPCName });

  return (
    <SafeView>
      <Text>{NPCName}</Text>
      <Text>
        {NPC.subrace} {NPC.race} {NPC.class}
      </Text>
      <Button
        title="Edit"
        onPress={() => {
          navigation.navigate("Edit NPC", { NPC: NPC });
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
              let NPCsList=campaign.NPCs;
              NPCsList.splice(NPC.index, 1)
              saveCampaign(campaign.id, JSON.stringify({...campaign, NPCs:NPCsList}))
              loadCampaign(campaign.id);
              setIsDeleteActive(false);
              navigation.navigate("NPCs List");

            }}
          />
        </>
      )}
    </SafeView>
  );
};
