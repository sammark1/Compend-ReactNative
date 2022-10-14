import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SaveContext = createContext();

export const SaveContextProvider = ({ children }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //ANCHOR SAVE DATA

  const saveData = async (campaign, value) => {
    const id = campaign.id;
    try {
      await AsyncStorage.setItem(`@campaign-${id}`, value);
    } catch (e) {
      //set error here
      console.log("Save Error", e);
    }
  };

  //ANCHOR LOAD DATA

  const loadData = async (campaign) => {
    const id = campaign.id;
    try {
      const value = await AsyncStorage.getItem(`@campaign-${id}`);
      if (value !== null) {
        setData(value);
      }
    } catch (e) {
      // error reading value
      console.log("Load Error");
    }
  };
  
  getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      console.log(keys)
    } catch (e) {
      console.log(e)
    }
  };

  clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log("Done.");
  };

  return (
    <SaveContext.Provider
      value={{
        data,
        isLoading,
        error,
        saveData,
        loadData,
        getAllKeys,
        clearAll,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};
