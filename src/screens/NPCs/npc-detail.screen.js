import React, { useState } from "react";
import { Text, Button } from "react-native";

import { SafeView } from "../../infrastructure/util/safe-area.component";

export const NPCDetail = ({
  route: {
    params: { NPC },
  },
  navigation,
}) => {
  const NPCName = NPC.givenName + " " + NPC.familyName;
  navigation.setOptions({ headerTitle: NPCName });
  return (
    <SafeView>
      <Text>{NPCName}</Text>
      <Text>
        {NPC.subrace} {NPC.race} {NPC.class}
      </Text>
      <Button
        title="Edit"
        onPress={() => {
          navigation.navigate("Edit NPC", { NPC: NPC });
        }}
      />
    </SafeView>
  );
};
