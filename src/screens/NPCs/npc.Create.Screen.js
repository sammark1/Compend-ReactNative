import React, { useState, useContext } from "react";
import { Text, View, Button } from "react-native";
import { TextInput } from "react-native-paper";
import styled from "styled-components/native";

import { SafeView } from "../../infrastructure/util/safe-area.component";

import { SaveContext } from "../../services/save/save.context";

const NPCForm = styled.View`
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

export const NPCCreate = ({navigation}) => {
  const { isLoading, error, data, loadData, saveData, getAllKeys, clearAll } =
    useContext(SaveContext);
    const parsedData = data ? JSON.parse(data):null;
  const [newNPC, setNewNPC] = useState({
    givenName: "Unnamed",
    familyName: "NPC",
    race: "noRace",
    subrace: "",
    class: "lv 1 commoner",
  });
  return (
    <SafeView>
      <NPCForm>
        <FormEntry>
          <TextInput
            label="Given Name"
            onChangeText={(text) => {
              setNewNPC({ ...newNPC, givenName: text });
            }}
          />
        </FormEntry>
        <FormEntry>
          <TextInput
            label="Family Name"
            onChangeText={(text) => {
              setNewNPC({ ...newNPC, familyName: text });
            }}
          />
        </FormEntry>
        <FormEntry>
          <TextInput
            label="Race"
            onChangeText={(text) => {
              setNewNPC({ ...newNPC, race: text });
            }}
          />
        </FormEntry>
        <FormEntry>
          <TextInput
            label="Subrace"
            onChangeText={(text) => {
              setNewNPC({ ...newNPC, subrace: text });
            }}
          />
        </FormEntry>
        <FormEntry>
          <TextInput
            label="Class"
            onChangeText={(text) => {
              setNewNPC({ ...newNPC, class: text });
            }}
          />
        </FormEntry>
        <FormConfirm>
          <Button title="Confirm" onPress={() => {
              const newData = parsedData;
              newData.saveData[0].NPCs.push(newNPC);
              saveData(JSON.stringify(newData));
              loadData();
              navigation.navigate('NPCs List');

          }} />
          <Button title="Cancel" onPress={() => {
            navigation.navigate('NPCs List');
          }}/>
        </FormConfirm>
      </NPCForm>
      <Text>{JSON.stringify(newNPC)}</Text>
    </SafeView>
  );
};
