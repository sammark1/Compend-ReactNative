import { Text, View } from "react-native";
import {
  createStackNavigator,
  Header,
  HeaderBackButton,
} from "@react-navigation/stack";
import styled from "styled-components";

// import { NPCStack } from "./NPC.navigator";
import { NPCsList } from "../../screens/NPCs/npcs-list.screen";
import { NPCCreate } from "../../screens/NPCs/npc.Create.Screen";
import { NPCDetail } from "../../screens/NPCs/npc-detail.screen";
import { NPCEdit } from "../../screens/NPCs/npc-edit.screen";
import { LocationsList } from "../../screens/Locations/locations-list.screen";
import { LocationDetail } from "../../screens/Locations/locations-detail.screen";
import { LocationCreate } from "../../screens/Locations/location-create.screen";
import { LocationEdit } from "../../screens/Locations/location-edit.screen";
import { CampaignDetail } from "../../screens/Campaigns/campaign-detail.screen";
import { CampaignsContext } from "../../services/campaigns/campaigns.context";
import { useContext } from "react";

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: CormInSBold;
  font-size: ${({ theme }) => theme.sizes.point.lg};
`;

const HeaderBackground = styled.View`
  background-color: ${({ theme }) => theme.colors.background.primaryDark};
  height: 100px;
`;

const CustomHeaderLeft = (props) => {
  <HeaderBackButton
    {...props}
    onPress={() => console.log("banana")}
  ></HeaderBackButton>;
};

const Stack = createStackNavigator();

const FactionsList = () => {
  return <Text>Factions List</Text>;
};

export const CampaignDetailNavigator = () => {
  const { campaign } = useContext(CampaignsContext);

  const getScreenOptions = () => ({
    headerShown: true,
    headerTitle: () =>
      campaign ? (
        <Title>{campaign.name}</Title>
      ) : (
        <Title>Campaign Detail</Title>
      ),
    headerBackground: () => <HeaderBackground />,
  });

  return (
    <Stack.Navigator screenOptions={getScreenOptions()}>
      <Stack.Screen name="CampaignDetail" component={CampaignDetail} />
      <Stack.Screen
        name="NPCs"
        component={NPCsList}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="NPC Detail"
        component={NPCDetail}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Create NPC"
        component={NPCCreate}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Edit NPC"
        component={NPCEdit}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Locations"
        component={LocationsList}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Location Detail"
        component={LocationDetail}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Location Create"
        component={LocationCreate}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Location Edit"
        component={LocationEdit}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="Factions" component={FactionsList} />
    </Stack.Navigator>
  );
};
