import React, { useState, useContext } from "react";
import { Text, Image, FlatList, Button } from "react-native";
import { Card, TextInput } from "react-native-paper";
import styled from "styled-components/native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { SaveContext } from "../../services/save/save.context";

import mocks from "../Admin/mocks.json";

const NPCView = styled.View`
  flex: 1;
  background-color: gold;
`;

const NPCCard = styled(Card)`
  background-color: white;
  margin-top: 2px;
`;

const NPCList = styled(FlatList)`
  background-color: lightgrey;
`;

export const NPCs = ({navigation}) => {
  const { isLoading, error, data, loadData, saveData } =
    useContext(SaveContext);
  const parsedData = data ? JSON.parse(data) : mocks;
  return (
    <SafeView>
        <Button title="temp New NPC" onPress={()=>{navigation.navigate('Create NPC')}}/>
      <NPCView>
        {data && (
          <>
            <Text>{parsedData.saveData[0].campaignName}</Text>
            <NPCList
              data={parsedData.saveData[0].NPCs}
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
          </>
        )}
      </NPCView>
    </SafeView>
  );
};
