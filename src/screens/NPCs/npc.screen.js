import React from "react";
import { Text, Image, FlatList } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

import { SafeView } from "../../infrastructure/util/safe-area.component";

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
  return (
    <SafeView>
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
          keyExtractor={(item) => item.givenName+" "+item.familyName}
        />
      </NPCView>
    </SafeView>
  );
};
