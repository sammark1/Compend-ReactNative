import React, { useState } from "react";
import { Text } from "react-native";

export const NPCDetail = ({
  route: {
    params: { NPC },
  },
  navigation,
}) => {
  const NPCName = NPC.givenName + " " + NPC.familyName;
  navigation.setOptions({ headerTitle: NPCName });
  return (
    <>
      <Text>{NPCName}</Text>
      <Text>
        {NPC.subrace} {NPC.race} {NPC.class}
      </Text>
    </>
  );
};
