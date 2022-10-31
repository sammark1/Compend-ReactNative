import React, { useContext, useState } from "react";
import { Text, Button, ActionSheetIOS } from "react-native";
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

export const LocationEdit = ({
  route: {
    params: { location },
  },
  navigation,
}) => {
  navigation.setOptions({ title: `Edit ${location.name}` });
  const { campaign, saveCampaign, loadCampaign } = useContext(CampaignsContext);
  const [editedLocation, setEditedLocation] = useState({
    pk: location.pk,
    name: location.name,
    nickname: location.nickname,
    type: location.type,
    tags: location.tags,
    details: location.details,
    residents: location.residents,
    creationDate: location.creationDate,
    editedDate: location.editedDate,
  });
  const [entryValues, setEntryValues] = useState({
    tags: location.tags,
    details: location.details,
  });
  return (
    <SafeView>
      <Text>Location Edit screen</Text>
      <LocationForm>
        <FormEntry>
          <TextInput
            label="Full Name"
            placeholder={location.name}
            onChangeText={(text) => {
              setEditedLocation({ ...editedLocation, name: text });
            }}
          />
        </FormEntry>
        <FormEntry>
          <TextInput
            label="Shortened Name"
            placeholder={location.nickname}
            onChangeText={(text) => {
              setEditedLocation({ ...editedLocation, name: text });
            }}
          />
        </FormEntry>
        <FormEntry>
          <TextInput
            label="Type"
            placeholder={location.type}
            onChangeText={(text) => {
              setEditedLocation({ ...editedLocation, type: text });
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
              let newDetails = editedLocation.details;
              newDetails.push(entryValues.details);
              setEditedLocation({ ...editedLocation, details: newDetails });
            }}
          />
        </AddButtonContainer>
        <AddList
          data={editedLocation.details}
          renderItem={({ item, index }) => {
            return (
              <>
                <Text>
                  <Text
                    onPress={() => {
                      let newDetails = editedLocation.details;
                      newDetails.splice(index, 1);
                      setEditedLocation({
                        ...editedLocation,
                        details: newDetails,
                      });
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
              let newTags = editedLocation.tags;
              newTags.push(entryValues.tags);
              setEditedLocation({ ...editedLocation, tags: newTags });
            }}
          />
        </AddButtonContainer>
        <AddList
          data={editedLocation.tags}
          renderItem={({ item, index }) => {
            return (
              <>
                <Text>
                  <Text
                    onPress={() => {
                      let newTags = editedLocation.tags;
                      newTags.splice(index, 1);
                      setEditedLocation({
                        ...editedLocation,
                        tags: newDetails,
                      });
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
              const locationsData = campaign.locations;
              locationsData[editedLocation.pk] = editedLocation;
              saveCampaign(
                campaign.id,
                JSON.stringify({ ...campaign, locations: locationsData })
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
        <Text>{JSON.stringify(editedLocation)}</Text>
      </LocationForm>
    </SafeView>
  );
};
