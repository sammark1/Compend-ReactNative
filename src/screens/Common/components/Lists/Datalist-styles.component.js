import React from "react";
import { FlatList } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import styled from "styled-components";

export const List = styled(FlatList)`
  // background-color: red;
`;

export const ListCard = styled(Card)`
  flex: 1;
  margin: 0 ${({ theme }) => theme.spacing.sm}
    ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.primaryDark};
  border-radius: ${({ theme }) => theme.spacing.xs};
`;

export const ListCardTitle = styled(Title)`
  font-family: CormInSBold;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const ListCardSubtitle = styled(Paragraph)`
  font-family: CormInSBold;
  font-size: ${({ theme }) => theme.sizes.point.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;
