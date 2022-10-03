import React, { useState, useContext } from "react";
import { Text, Button } from "react-native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { SaveContext } from "../../services/save/save.context";
import mocks from "./mocks.json";

export const Admin = () => {
  const [display, setDisplay] = useState("default");
  const { isLoading, error, data, loadData, saveData, getAllKeys, clearAll } =
    useContext(SaveContext);
  return (
    <SafeView>
      <Button
        title="Populate with Mocks"
        onPress={() => {
          saveData(JSON.stringify(mocks));
        }}
      />
      <Button
        title="List All Keys"
        onPress={() => {
          getAllKeys().then(setDisplay(data));
        }}
      />
      <Button
        title="Load @saveData"
        onPress={() => {
          loadData().then(setDisplay(data));
        }}
      />
      <Text>{display}</Text>
    </SafeView>
  );
};
