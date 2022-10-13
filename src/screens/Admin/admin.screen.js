import React, { useState, useContext, useEffect } from "react";
import { Text, Button } from "react-native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { SaveContext } from "../../services/save/save.context";
import mocks from "./mocks.json";

export const Admin = () => {
  const [display, setDisplay] = useState("default");
  const { isLoading, error, data, loadData, saveData, getAllKeys, clearAll } =
    useContext(SaveContext);

    useEffect(()=>{
      loadData()
    },[])
    
    useEffect(()=>{
      setDisplay(data)
    },[data])

  return (
    <SafeView>
      <Button
        title="Populate with mock data"
        onPress={() => {
          saveData(JSON.stringify(mocks));
        }}
      />
      
      <Text>Current context data: {display}</Text>
    </SafeView>
  );
};
