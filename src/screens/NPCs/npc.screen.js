import React from "react";
import { Text, Image } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

import { SafeView } from "../../infrastructure/util/safe-area.component";

const NPCTable = styled.View`
  flex: 1;
  background-color: gold;
`;

const NPCCard = styled(Card)`
background-color: tomato;
max-width: 200px;
`

export const NPCs = () => {
  return (
    <SafeView>
      <NPCTable>
        <NPCCard mode="outlined">
          <Card.Title title="NPC name" subtitle="NPC race and class" />
        </NPCCard>
        <Card>
          <Card.Title title="NPC name" subtitle="NPC race and class" />
        </Card>
        <Card>
          <Card.Title title="NPC name" subtitle="NPC race and class" />
        </Card>
      </NPCTable>
    </SafeView>
  );
};
