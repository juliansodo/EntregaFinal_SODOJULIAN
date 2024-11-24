import { styled } from "nativewind";
import React from "react";
import { ImageBackground, Dimensions, Text } from "react-native";

const StyledImageBackground = styled(ImageBackground);
const {width, height} = Dimensions.get("screen");
export  function ContainerWithBackgroundImage({ imageUrl, children, className }) {

  return (
    <StyledImageBackground
      source={imageUrl}
      style={{ width, height}}
      resizeMode="cover"
      className={className}
    >
      {children}
    </StyledImageBackground>
  );
}