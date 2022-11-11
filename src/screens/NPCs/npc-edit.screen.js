import React, {useContext, useState} from "react";
import { Text, Button } from "react-native";
import { TextInput } from "react-native-paper";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { NPCForm, NPCFormEntry, NPCFormConfirm } from "./components/NPC-styles.component";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";

export const NPCEdit = ({
  route: {
    params: { NPC },
  },
  navigation,
}) => {
  const NPCName = NPC.givenName + " " + NPC.familyName;
  //FIXME ANNOYING WARNING FROM FOLLOWING LINE
  // navigation.setOptions({ title: `Edit ${NPCName}` });
  const { campaign, saveCampaign, loadCampaign } = useContext(CampaignsContext);
  const [editedNPC, setEditedNPC] = useState({
    pk:NPC.pk,
    givenName: NPC.givenName,
    familyName: NPC.familyName,
    race: NPC.race,
    subrace: NPC.subrace,
    class: NPC.class,
    residence: NPC.residence
  });
  return (
    <SafeView>
      <Text>NPC Edit screen</Text>
      <NPCForm>
       
        <NPCFormEntry>
          <TextInput
            label="Given Name"
            placeholder={NPC.givenName}
            onChangeText={(text) => {
              setEditedNPC({ ...editedNPC, givenName: text });
            }}
          />
        </NPCFormEntry>
        <NPCFormEntry>
          <TextInput
            label="Family Name"
            placeholder={NPC.familyName}
            onChangeText={(text) => {
              setEditedNPC({ ...editedNPC, familyName: text });
            }}
          />
        </NPCFormEntry>
        <NPCFormEntry>
          <TextInput
            label="Race"
            placeholder={NPC.race}
            onChangeText={(text) => {
              setEditedNPC({ ...editedNPC, race: text });
            }}
          />
        </NPCFormEntry>
        <NPCFormEntry>
          <TextInput
            label="Subrace"
            placeholder={NPC.subrace}
            onChangeText={(text) => {
              setEditedNPC({ ...editedNPC, subrace: text });
            }}
          />
        </NPCFormEntry>
        <NPCFormEntry>
          <TextInput
            label="Class"
            placeholder={NPC.class}
            onChangeText={(text) => {
              setEditedNPC({ ...editedNPC, class: text });
            }}
          />
        </NPCFormEntry>
        <NPCFormConfirm>
          <Button
            title="Confirm"
            onPress={() => {
              const NPCsData = campaign.NPCs
              NPCsData[NPC.pk]=editedNPC;
              saveCampaign(campaign.id, JSON.stringify({...campaign, NPCs:NPCsData}))
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
      <Text>{JSON.stringify(editedNPC)}</Text>
      </NPCForm>
    </SafeView>
  );
};
