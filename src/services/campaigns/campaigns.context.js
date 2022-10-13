import React, {createContext,useState} from "react";

export const CampaignsContext = createContext();

export const CampaignsContextProvider = ({ children }) => {
    const [campaignIndex, setCampaignIndex] = useState(0)

    const selectCampaignIndex = (value) => {
        // console.log("setting ",value," to campaign")
        setCampaignIndex(value)
    }

    return(
        <CampaignsContext.Provider
      value={{
        campaignIndex,
        selectCampaignIndex,
      }}
    >
      {children}
    </CampaignsContext.Provider>
    )
}