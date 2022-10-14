import React from "react";
// import { View } from "react-native";
import styled from "styled-components";


const sizeVariant = {
    xsmall: `2px`,
    small: `4px`,
    medium: `8px`,
    large: `16px`,
    xlarge: `32px`,
  };

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

const getVariant = (location, size, theme) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[location];
//   const value = theme.space[sizeIndex];
  return `${property}:${sizeIndex}`;
};

export const Spacer = styled.View`
  ${({ location, size, theme }) => getVariant(location, size, theme)}
`;
