import React, { useState, useContext } from "react";
import { Text, Image, FlatList, Button } from "react-native";
import { Card, TextInput } from "react-native-paper";
import styled from "styled-components/native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { SaveContext } from "../../services/save/save.context";

const NPCView = styled.View`
  flex: 1;
  background-color: gold;
`;

const NPCCard = styled(Card)`
  background-color: tomato;
`;

const NPCList = styled(FlatList)`
  background-color: dodgerblue;
`;

const NPCArray = [
  {
    givenName: "Harry",
    familyName: "Potter",
    subrace: "",
    race: "human",
    class: "lv 20 wizard",
  },
  {
    givenName: "Jeremy",
    familyName: "Yu",
    subrace: "",
    race: "human",
    class: "lv 9 programmer",
  },
  {
    givenName: "Chugga",
    familyName: "Conroy",
    subrace: "drow",
    race: "elf",
    class: "lv 20 wizard",
  },
  {
    givenName: "Geralt",
    familyName: "Of Rivia",
    subrace: "witcher",
    race: "human",
    class: "lv 17 Fighter",
  },
  {
    givenName: "Ginny",
    familyName: "Potter",
    subrace: "",
    race: "human",
    class: "lv 18 wizard",
  },
];

export const NPCs = () => {
  const [tempInput, setTempInput] = useState("");
  const [output, setOutput] = useState("");
  const { isLoading, error, data, loadData, saveData, getAllKeys, clearAll } =
    useContext(SaveContext);
  return (
    <SafeView>
      <TextInput
        onChangeText={(text) => {
          setTempInput(text);
        }}
      />
      <Button
        title="Save"
        onPress={() => {
          saveData(tempInput);
        }}
      />
      <Button
        title="Load"
        onPress={() => {
          setOutput(loadData());
        }}
      />
      <Button
        title="Check"
        onPress={() => {
          getAllKeys();
        }}
      />
      <Button
        title="clear all"
        onPress={() => {
          clearAll();
        }}
      />
      <Text>{data}</Text>
      <NPCView>
        {/* TODO space here for a header */}
        <NPCList
          data={NPCArray}
          renderItem={({ item }) => {
            return (
              <NPCCard mode="">
                <Card.Title
                  title={item.givenName + " " + item.familyName}
                  subtitle={`${item.subrace} ${item.race} ${item.class}`}
                />
              </NPCCard>
            );
          }}
          keyExtractor={(item) => item.givenName + " " + item.familyName}
        />
      </NPCView>
    </SafeView>
  );
};
