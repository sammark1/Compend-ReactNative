import React from "react";
import * as ListStyles from "./Datalist-styles.component";

export const NPCListCard = ({ item, extras, pressEvent }) => {
  return (
    <ListStyles.ListCard onPress={pressEvent}>
      <ListStyles.ListCard.Content>
        <ListStyles.ListCardTitle>
          {item.givenName + " " + item.familyName}
        </ListStyles.ListCardTitle>
        <ListStyles.ListCardSubtitle>
          {`${item.subrace} ${item.race} ${item.class}`}
        </ListStyles.ListCardSubtitle>
        <ListStyles.ListCardSubtitle>{` ${extras}`}</ListStyles.ListCardSubtitle>
      </ListStyles.ListCard.Content>
    </ListStyles.ListCard>
  );
};

export const LocationListCard = ({ item, extras, pressEvent }) => {
  return (
    <ListStyles.ListCard onPress={pressEvent}>
      <ListStyles.ListCard.Content>
        <ListStyles.ListCardTitle>{item.name}</ListStyles.ListCardTitle>
        <ListStyles.ListCardSubtitle>
          {item.nickname}
        </ListStyles.ListCardSubtitle>
        <ListStyles.ListCardSubtitle>
          {extras}
        </ListStyles.ListCardSubtitle>
      </ListStyles.ListCard.Content>
    </ListStyles.ListCard>
  );
};
