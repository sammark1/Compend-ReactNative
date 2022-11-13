import React, { useContext, useEffect, useState } from "react";
import { Text, Button, View, FlatList } from "react-native";

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
  const {
    campaign,
    saveCampaign,
    loadCampaign,
    getDataRelationship,
    relatedData,
  } = useContext(CampaignsContext);

  useEffect(() => {
    console.log(getDataRelationship(NPC.residence));
  }, []);

  //FIXME ANNOYING WARNING FROM FOLLOWING LINE
  // navigation.setOptions({ title: NPCName });

  return (
    <SafeView>
      <Text>{NPCName}</Text>
      <Text>
        {NPC.subrace} {NPC.race} {NPC.class}
      </Text>
      {relatedData && (
        <FlatList
          data={relatedData}
          renderItem={({ item, index }) => {
            return (
              <Text
                onPress={() => {
                  navigation.navigate("Location Detail", { location: item });
                }}
              >
                {item.name}
              </Text>
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        ></FlatList>
      )}
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
              let NPCsData = campaign.NPCs;
              delete NPCsData[NPC.pk];
              saveCampaign(
                campaign.id,
                JSON.stringify({ ...campaign, NPCs: NPCsData })
              );
              loadCampaign(campaign.id);
              setIsDeleteActive(false);
              navigation.navigate("NPCs");
            }}
          />
        </>
      )}
    </SafeView>
  );
};
