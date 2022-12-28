import React from "react";
import styled from "styled-components";
import { SafeAreaView, StatusBar } from "react-native";

export const Screen = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`}
  display:flex;
`;
