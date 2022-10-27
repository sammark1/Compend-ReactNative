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

  const getDataRelationship = (dataType, dataValue1, dataType2) => {
    //FIXME - unfinished
    //TODO refine
    //TODO move to new service
    //TODO async and loading
    //returns a list of dataType2 entries that dataValue1 references
    try {
      const acceptedDataTypes = ["NPC", "location"];
      if (!campaign) {
        setError("Error: Campaign not found");
        return;
      } else if (!acceptedDataTypes.includes(dataType)) {
        setError("Error: dataType does not match expected values");
        return;
      }
      //list of all campaign entries for dataType
      const list = campaign[dataType + "s"];
      //list of all refs for dataType_dataType2
      const refs =
        campaign.dataTables[dataType + "_" + dataType2][dataValue1.pk];
      let refList = [];
      for (let i = 0; i < refs.length; i++) {
        // console.log(list[refs[]])
        refList.push(list[refs[i]]);
      }
      console.log("List", refList);
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
      }}
    >
      {children}
    </CampaignsContext.Provider>
  );
};
