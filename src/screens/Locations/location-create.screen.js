import React, { useState, useContext } from "react";
import { Text, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";

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

export const LocationCreate = ({ navigation }) => {
  const { campaign, saveCampaign, loadCampaign } = useContext(CampaignsContext);
  const [entryValues, setEntryValues] = useState({
    tags: "",
    details: "",
  });
  const [newLocation, setNewLocation] = useState({
    name: "unnamed location",
    nickname: "unnamed",
    type: "location",
    tags: [],
    details: [],
    creationDate: new Date(),
    editedDate: new Date(),
  });
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
        <FormConfirm>
          <Button
            title="Confirm"
            onPress={() => {
                const newLocations = campaign.locations;
                newLocations.push(newLocation);
                saveCampaign(
                  campaign.id,
                  JSON.stringify({ ...campaign, NPCs: newLocations })
                );
                loadCampaign(campaign.id);
                navigation.navigate("Locations List");
            }}
          />
          <Button
            title="Cancel"
            onPress={() => {
              navigation.navigate("Locations List");
            }}
          />
        </FormConfirm>
      </LocationForm>
      <Text>{JSON.stringify(newLocation)}</Text>
    </SafeView>
  );
};
