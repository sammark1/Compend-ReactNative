import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CampaignsContext = createContext();

export const CampaignsContextProvider = ({ children }) => {
  const [campaign, setCampaign] = useState(null);
  const [campaignsList, setCampaignsList] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignIndex, setCampaignIndex] = useState(0);

  const saveCampaign = async (id, value) => {
    try {
      await AsyncStorage.setItem(`@campaign-${id}`, value);
    } catch (e) {
      setError(e);
      console.log("Save Error", e);
    }
  };

  const loadCampaign = async (id) => {
    try {
      const result = await AsyncStorage.getItem(`@campaign-${id}`);
      if (result !== null) {
        setCampaign(result);
      } else {
        setError("Load Error: Campaign not found");
        console.log(error);
      }
    } catch (e) {
      setError(e);
      console.log("Load Error", e);
    }
  };

  const updateCampaignsList = async (campaign) => {
    try {
      await AsyncStorage.getItem(`@campaigns-list`)
        .then((result) => {
          let list = [];
          if (result) {
            list = JSON.parse(result).data;
          } else {
            list = [];
          }
          list.push(campaign.name);
          return list;
        })
        .then((list) => {
          AsyncStorage.setItem(
            `@campaigns-list`,
            JSON.stringify({ data: list })
          );
        });
    } catch (e) {
      setError(e);
      console.log("Campaigns List Save Error", e);
    }
  };

  const loadCampaignsList = async () => {
    try {
      const list = await AsyncStorage.getItem(`@campaigns-list`);
      setCampaignsList(list);
      setCampaign(null)
    } catch (e) {
      setError(e);
      console.log("Campaigns List Load Error", e);
    }
  };

  const selectCampaignIndex = (value) => {
    // console.log("setting ",value," to campaign")
    setCampaignIndex(value);
  };

  return (
    <CampaignsContext.Provider
      value={{
        saveCampaign,
        loadCampaign,
        updateCampaignsList,
        loadCampaignsList,
        campaign,
        campaignsList,
        campaignIndex, //deprecated
        selectCampaignIndex, //deprecated
      }}
    >
      {children}
    </CampaignsContext.Provider>
  );
};
