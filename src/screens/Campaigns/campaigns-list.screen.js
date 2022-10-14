import react, { useContext, useEffect } from "react";
import { Button, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import { Card, TextInput } from "react-native-paper";

import { SafeView } from "../../infrastructure/util/safe-area.component";
import { SaveContext } from "../../services/save/save.context";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";

export const CampaignsList = ({ navigation }) => {
  const { isLoading, error, data, loadData, saveData } =
    useContext(SaveContext);
  const { selectCampaignIndex } = useContext(CampaignsContext);
  const parsedData = data ? JSON.parse(data) : null;

  const CampaignView = styled.View`
    flex: 1;
    background-color: dodgerblue;
  `;

  const CampaignList = styled(FlatList)`
    background-color: gold;
  `;

  const NPCCard = styled(Card)`
    background-color: white;
    margin-top: 2px;
  `;

  // useEffect(() => {
  //   loadData();
  // }, []);

  const TempData = {
    dataID: 1,
    creationDate: new Date(),
    editedDate: new Date(),
    saveData: [
      {
        campaignName: "TestCampaign",
        creationDate: new Date(),
        editedDate: new Date(),
        NPCs: [],
      },
      {
        campaignName: "TestCampaign2",
        creationDate: new Date(),
        editedDate: new Date(),
        NPCs: [],
      },
    ],
  };

  return (
    <SafeView>
      <CampaignView>
        {parsedData ? (
          <>
            <Text>Campaigns</Text>
            <CampaignList
              data={TempData.saveData}
              renderItem={({ item, index }) => {
                return (
                  <NPCCard
                    mode=""
                    onPress={() => {
                      selectCampaignIndex(index);
                      navigation.navigate("Campaign Nav", { campaign: item });
                    }}
                  >
                    <Card.Title
                      title={item.campaignName}
                      right={() => (
                        <Text>
                          {item.creationDate.getMonth() +
                            "/" +
                            item.creationDate.getDay() +
                            "/" +
                            item.creationDate.getFullYear()}
                        </Text>
                      )}
                    />
                  </NPCCard>
                );
              }}
              keyExtractor={(item) => item.campaignName}
            />
          </>
        ):(
          <Text>No campaigns yet</Text>
        )}
      </CampaignView>
        <Button title="settings" onPress={()=>navigation.navigate("Settings")}/>
    </SafeView>
  );
};
