import React, { useState, useContext } from "react";
import { Text, View, Button } from "react-native";
import { TextInput } from "react-native-paper";
import styled from "styled-components/native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import {
  NPCForm,
  NPCFormEntry,
  NPCFormConfirm,
} from "./components/NPC-styles.component";

import { CampaignsContext } from "../../services/campaigns/campaigns.context";

// const NPCForm = styled.View`
//   background-color: darkgrey;
//   flex-direction: row;
//   flex-wrap: wrap;
// `;
// const FormEntry = styled.View`
//   flex: 1;
//   min-width: 50%;
// `;

// const FormConfirm = styled.View`
//   flex-direction: row;
//   background-color: lightGray;
//   width: 100%;
//   justify-content: space-around;
// `;

export const NPCCreate = ({ navigation }) => {
  const { campaign, saveCampaign, loadCampaign } = useContext(CampaignsContext);

  //TODO MAKE NEW PK GENERATOR FUNCTION

  const [newNPC, setNewNPC] = useState({
    pk: Math.floor(Math.random() * 10000),
    givenName: "Unnamed",
    familyName: "NPC",
    race: "noRace",
    subrace: "",
    class: "lv 1 commoner",
  });
  return (
    <SafeView>
      <NPCForm>
        <NPCFormEntry>
          <TextInput
            label="Given Name"
            onChangeText={(text) => {
              setNewNPC({ ...newNPC, givenName: text });
            }}
          />
        </NPCFormEntry>
        <NPCFormEntry>
          <TextInput
            label="Family Name"
            onChangeText={(text) => {
              setNewNPC({ ...newNPC, familyName: text });
            }}
          />
        </NPCFormEntry>
        <NPCFormEntry>
          <TextInput
            label="Race"
            onChangeText={(text) => {
              setNewNPC({ ...newNPC, race: text });
            }}
          />
        </NPCFormEntry>
        <NPCFormEntry>
          <TextInput
            label="Subrace"
            onChangeText={(text) => {
              setNewNPC({ ...newNPC, subrace: text });
            }}
          />
        </NPCFormEntry>
        <NPCFormEntry>
          <TextInput
            label="Class"
            onChangeText={(text) => {
              setNewNPC({ ...newNPC, class: text });
            }}
          />
        </NPCFormEntry>
        <NPCFormConfirm>
          <Button
            title="Confirm"
            onPress={() => {
              const newNPCs = campaign.NPCs;
              newNPCs[newNPC.pk] = newNPC;
              // console.log(newNPCs)
              saveCampaign(
                campaign.id,
                JSON.stringify({ ...campaign, NPCs: newNPCs })
              );
              loadCampaign(campaign.id);
              navigation.navigate("NPCs List");
            }}
          />
          <Button
            title="Cancel"
            onPress={() => {
              navigation.navigate("NPCs List");
            }}
          />
        </NPCFormConfirm>
      </NPCForm>
      <Text>{JSON.stringify(newNPC)}</Text>
    </SafeView>
  );
};
