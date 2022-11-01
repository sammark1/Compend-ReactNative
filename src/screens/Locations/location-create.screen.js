import { Link } from "@react-navigation/native";
import React, { useState, useContext, useEffect } from "react";
import { Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";
import styled from "styled-components";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";

const AddList = styled.FlatList`
  background-color: white;
  width: 100%;
`;

const AddButtonContainer = styled.View`
  flex: 1;
  min-width: 50%;
`;

const LocationForm = styled.View`
  background-color: darkgrey;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FormEntry = styled.View`
  flex: 1;
  min-width: 50%;
`;

const FormConfirm = styled.View`
  flex-direction: row;
  background-color: lightGray;
  width: 100%;
  justify-content: space-around;
`;

const HalfContainer = styled.View`
  width: 50%;
`;

export const LocationCreate = ({ navigation }) => {
  const { campaign, saveCampaign, loadCampaign } = useContext(CampaignsContext);
  const [entryValues, setEntryValues] = useState({
    tags: "",
    details: "",
  });
  const [newLocation, setNewLocation] = useState({
    pk: Math.floor(Math.random() * 10000),
    name: "unnamed location",
    nickname: "unnamed",
    type: "location",
    tags: [],
    details: [],
    residents: {
      relatedType: "NPCs",
      refTable: "location_NPC",
      key: null,
    },
    creationDate: new Date(),
    editedDate: new Date(),
  });
  const [linkedNPCs, setlinkedNPCs] = useState({
    NPCs: Object.values(campaign.NPCs),
    linked: [],
    pks: [],
  });

  useEffect(() => {
    setNewLocation({
      ...newLocation,
      residents: { ...newLocation.residents, key: newLocation.pk },
    });
  }, []);

  return (
    <SafeView>
      <LocationForm>
        <FormEntry>
          <TextInput
            label="Full Name"
            onChangeText={(text) => {
              setNewLocation({ ...newLocation, name: text });
            }}
          />
        </FormEntry>
        <FormEntry>
          <TextInput
            label="Shortened Name"
            onChangeText={(text) => {
              setNewLocation({ ...newLocation, nickname: text });
            }}
          />
        </FormEntry>
        <FormEntry>
          <TextInput
            label="Type"
            onChangeText={(text) => {
              setNewLocation({ ...newLocation, type: text });
            }}
          />
        </FormEntry>
        <FormEntry>
          <TextInput
            label="Details"
            onChangeText={(text) => {
              setEntryValues({ ...entryValues, details: text });
            }}
          />
        </FormEntry>
        <AddButtonContainer>
          <Button
            title="+"
            onPress={() => {
              let newDetails = newLocation.details;
              newDetails.push(entryValues.details);
              setNewLocation({ ...newLocation, details: newDetails });
            }}
          />
        </AddButtonContainer>
        <AddList
          data={newLocation.details}
          renderItem={({ item, index }) => {
            return (
              <>
                <Text>
                  <Text
                    onPress={() => {
                      let newDetails = newLocation.details;
                      newDetails.splice(index, 1);
                      setNewLocation({ ...newLocation, details: newDetails });
                    }}
                  >
                    -
                  </Text>
                  {item}
                </Text>
              </>
            );
          }}
          keyExtractor={(item, index) => `${index}_${item}`}
        ></AddList>
        <FormEntry>
          <TextInput
            label="Tags"
            onChangeText={(text) => {
              setEntryValues({ ...entryValues, tags: text });
            }}
          />
        </FormEntry>
        <AddButtonContainer>
          <Button
            title="+"
            onPress={() => {
              let newTags = newLocation.tags;
              newTags.push(entryValues.tags);
              setNewLocation({ ...newLocation, tags: newTags });
            }}
          />
        </AddButtonContainer>
        <AddList
          data={newLocation.tags}
          renderItem={({ item, index }) => {
            return (
              <>
                <Text>
                  <Text
                    onPress={() => {
                      let newTags = newLocation.tags;
                      newTags.splice(index, 1);
                      setNewLocation({ ...newLocation, tags: newDetails });
                    }}
                  >
                    -
                  </Text>
                  {item}
                </Text>
              </>
            );
          }}
          keyExtractor={(item, index) => `${index}_${item}`}
        ></AddList>
        <HalfContainer>
          <Text>NPC Residents</Text>
          <AddList
            data={linkedNPCs.NPCs}
            renderItem={({ item, index }) => {
              return (
                <>
                  <Text
                    onPress={() => {
                      let newLinkedNPCs = linkedNPCs;
                      newLinkedNPCs.NPCs.splice(index, 1);
                      newLinkedNPCs.linked.push(item);
                      newLinkedNPCs.pks.push(item.pk);
                      setlinkedNPCs(newLinkedNPCs);
                    }}
                  >
                    {item.givenName} +
                  </Text>
                </>
              );
            }}
            keyExtractor={(item, index) => `${index}`}
          ></AddList>
        </HalfContainer>
        <HalfContainer>
          <Text>NPC residents added</Text>
          <AddList
            data={linkedNPCs.linked}
            renderItem={({ item, index }) => {
              return (
                <>
                  <Text onPress={() => {}}>{item.givenName} -</Text>
                </>
              );
            }}
            keyExtractor={(item, index) => `${index}`}
          ></AddList>
        </HalfContainer>
        <FormConfirm>
          <Button
            title="Confirm"
            onPress={() => {
              const newLocations = campaign.locations;
              newLocations[newLocation.pk] = newLocation;
              saveCampaign(
                campaign.id,
                JSON.stringify({ ...campaign, locations: newLocations })
              );
              const newRelation = campaign.dataTables.location_NPC;
              newRelation[newLocation.pk] = linkedNPCs.pks;
              saveCampaign(
                campaign.id,
                JSON.stringify({
                  ...campaign,
                  dataTables: {
                    ...campaign.dataTables,
                    location_NPC: newRelation,
                  },
                })
              );

              loadCampaign(campaign.id);
              navigation.navigate("Locations");
            }}
          />
          <Button
            title="Cancel"
            onPress={() => {
              navigation.navigate("Locations");
            }}
          />
        </FormConfirm>
      </LocationForm>
      <Text>{JSON.stringify(newLocation)}</Text>
      <Text>{JSON.stringify(linkedNPCs.pks)}</Text>
    </SafeView>
  );
};
