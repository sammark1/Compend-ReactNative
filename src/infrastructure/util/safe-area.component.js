import styled from "styled-components/native";
import { SafeAreaView, StatusBar } from "react-native";

export const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`}
  display: flex;
`;
