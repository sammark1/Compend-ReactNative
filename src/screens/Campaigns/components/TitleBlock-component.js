import React from "react";
import styled from "styled-components";

const TitleView = styled.View`
  display: flex;
  align-items: center;
`;

const TitleText = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: AlmendraSC;
  font-size: ${({theme})=> theme.sizes.point.xl2};
`;

export const TitleBlock = ({ title }) => {
  return (
    <TitleView>
      <TitleText>{title}</TitleText>
    </TitleView>
  );
};
