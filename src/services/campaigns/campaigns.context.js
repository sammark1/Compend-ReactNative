import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CampaignsContext = createContext();

export const CampaignsContextProvider = ({ children }) => {
  const [campaign, setCampaign] = useState(null);
  const [campaignsList, setCampaignsList] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignIndex, setCampaignIndex] = useState(0);
  const [relatedData, setRelatedData] = useState([]);

  const saveCampaign = async (id, value) => {
    console.log("Campaigns Context-- ", "Saving Campaign with id: ", id);
    try {
      await AsyncStorage.setItem(`@campaign-${id}`, value);
    } catch (e) {
      setError(e);
      console.log("Save Error", e);
    }
  };

  const loadCampaign = async (id) => {
    console.log("Campaigns Context-- ", "Loading Campaign with id: ", id);
    try {
      const result = await AsyncStorage.getItem(`@campaign-${id}`);
      if (result !== null) {
        setCampaign(JSON.parse(result));
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
    console.log(
      "Campaigns Context-- ",
      "Updating Campaigns List with campaign: ",
      campaign.id
    );
    try {
      await AsyncStorage.getItem(`@campaigns-list`)
        .then((result) => {
          let list = {};
          if (result) {
            list = JSON.parse(result);
          } else {
            list = {};
          }
          list[campaign.id + "_" + campaign.name] = {
            id: campaign.id,
            name: campaign.name,
            creationDate: campaign.creationDate,
            editedDate: campaign.editedDate,
          };
          return list;
        })
        .then((list) => {
          AsyncStorage.setItem(`@campaigns-list`, JSON.stringify(list));
        });
    } catch (e) {
      setError(e);
      console.log("Campaigns List Save Error", e);
    }
  };

  const loadCampaignsList = async () => {
    console.log("Campaigns Context-- ", "Loading Campaigns List");

    try {
      const list = await AsyncStorage.getItem(`@campaigns-list`);
      setCampaignsList(list);
      setCampaign(null);
    } catch (e) {
      setError(e);
      console.log("Campaigns List Load Error", e);
    }
  };

  const selectCampaignIndex = (value) => {
    // console.log("setting ",value," to campaign")
    setCampaignIndex(value);
  };

  const getDataRelationship = (dataRelationship) => {
    try {
      if (!campaign) {
        setError("Error: Campaign not found");
        return;
      }
      const pkList =
        campaign.dataTables[dataRelationship.refTable][dataRelationship.key];
      const dataList = [];
      for (let i = 0; i < pkList.length; i++) {
        dataList.push(campaign[dataRelationship.relatedType][pkList[i]]);
      }
      setRelatedData(dataList);
    } catch (e) {
      setError(e);
    }
  };

  const setDataRelationship = (dataRelationship, values) => {
    try {
      if (!campaign) {
        setError("Error: Campaign not found");
        return;
      }
      let newCampaign = campaign;
      newCampaign.dataTables[dataRelationship.refTable][dataRelationship.key] =
        values;
      saveCampaign(campaign.id, JSON.stringify(campaign));
    } catch (e) {
      setError(e);
    }
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
        getDataRelationship,
        setDataRelationship,
        relatedData,
      }}
    >
      {children}
    </CampaignsContext.Provider>
  );
};
