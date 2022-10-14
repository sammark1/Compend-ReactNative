import React, { useState, useContext, useEffect } from "react";
import { Text, Button } from "react-native";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { SaveContext } from "../../services/save/save.context";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";
import mocks1 from "./mocks-1.json";
import mocks2 from "./mocks-2.json";
import mocksGlobal from "./mocks-global.json";

export const Admin = () => {
  const [display, setDisplay] = useState("default");
  const { isLoading, error, data, loadData, saveData, getAllKeys, clearAll } =
    useContext(SaveContext);
  const {
    campaign,
    campaignsList,
    saveCampaign,
    loadCampaign,
    updateCampaignsList,
    loadCampaignsList,
  } = useContext(CampaignsContext);

  useEffect(() => {
    if (campaign) {
      setDisplay(String(campaign));
    } else if (campaignsList) {
      setDisplay(String(campaignsList));
    } else if (campaign && campaignsList) {
      setDisplay(String(campaignsList + campaign));
    } else {
      setDisplay("no available JSON data");
    }
  }, [campaign, campaignsList]);

  return (
    <SafeView>
      <Button
        title="Populate with mock data"
        onPress={async () => {
          await saveCampaign(mocks1.id, JSON.stringify(mocks1));
          await saveCampaign(mocks2.id, JSON.stringify(mocks2));
          await updateCampaignsList(mocks1);
          await updateCampaignsList(mocks2);
        }}
      />
      <Button
        title="Load and display save index-0"
        onPress={() => {
          loadCampaign(0);
        }}
      />
      <Button
        title="Load and display save index-1"
        onPress={() => {
          loadCampaign(1);
        }}
      />
      <Button
        title="log campaigns list"
        onPress={() => {
          loadCampaignsList();
        }}
      />
      <Button
        title="log all save tags"
        onPress={() => {
          getAllKeys();
        }}
      />
      <Button
        title="clear all data"
        onPress={() => {
          clearAll();
        }}
      />

      <Text>Current context data: {display}</Text>
    </SafeView>
  );
};
