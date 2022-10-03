import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SaveContext = createContext();

export const SaveContextProvider = ({ children }) => {
  const [data, setData] = useState("default");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //ANCHOR SAVE DATA

  const saveData = async (value) => {
    // console.log("saveData")
    //TODO REFACTOR ME
    // setIsLoading(true);
    try {
      await AsyncStorage.setItem("@saveData", value);
    } catch (e) {
      //set error here
      console.log("Save Error", e);
    }
  };

  //ANCHOR LOAD DATA

  const loadData = async () => {
    //TODO REFACTOR ME
    // setIsLoading(true);
    try {
      const value = await AsyncStorage.getItem("@saveData");
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
    } catch (e) {
      // read key error
    }

    setData(String(keys))
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
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
