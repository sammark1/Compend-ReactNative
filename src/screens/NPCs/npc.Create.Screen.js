import React, { useState, useContext, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { TextInput, Provider } from "react-native-paper";
import styled from "styled-components/native";
import DropDown from "react-native-paper-dropdown";

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

const FullView = styled.View`
  width: 100%;
`;

export const NPCCreate = ({ navigation }) => {
  const { campaign, saveCampaign, loadCampaign } =
    useContext(CampaignsContext);
  const [showDropDown, setShowDropDown] = useState(false);
  const [residence, setResidence] = useState({});
  //TODO MAKE NEW PK GENERATOR FUNCTION
  // useEffect(() => {
  //   console.log(
  //     Object.values(campaign.locations).map((location) => ({
  //       label: location.name,
  //       value: location,
  //     }))
  //   );
  // }, []);

  const [newNPC, setNewNPC] = useState({
    pk: Math.floor(Math.random() * 10000),
    givenName: "Unnamed",
    familyName: "NPC",
    race: "noRace",
    subrace: "",
    class: "lv 1 commoner",
    residence: {
      linkType: "OTO",
      linkRelation: "locations",
      linkKeys: null,
    },
  });

  const getPossibleResidences = () => {
    let locations = [
      {
        label: "No Residence",
        value: null,
      },
    ];
    locations = locations.concat(
      Object.values(campaign.locations).map((location) => ({
        label: location.name,
        value: location.pk,
      }))
    );
    return locations;
  };

  return (
    <Provider>
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
          <FullView>
            <DropDown
              label={"NPC Residence"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              list={getPossibleResidences()}
              value={newNPC.residence.linkKeys}
              setValue={(value) =>
                setNewNPC({
                  ...newNPC,
                  residence: {
                    ...newNPC.residence,
                    linkKeys: value,
                  },
                })
              }
            />
          </FullView>
          <NPCFormConfirm>
            <Button
              title="Confirm"
              onPress={() => {
                const newNPCs = campaign.NPCs;
                newNPCs[newNPC.pk] = newNPC;
                updateLinkedData()
                saveCampaign(
                  campaign.id,
                  JSON.stringify({ ...campaign, NPCs: newNPCs })
                );
                loadCampaign(campaign.id);
                navigation.navigate("NPCs");
              }}
            />
            <Button
              title="Cancel"
              onPress={() => {
                navigation.navigate("NPCs");
              }}
            />
          </NPCFormConfirm>
        </NPCForm>
        <Text>{JSON.stringify(newNPC)}</Text>
      </SafeView>
    </Provider>
  );
};
