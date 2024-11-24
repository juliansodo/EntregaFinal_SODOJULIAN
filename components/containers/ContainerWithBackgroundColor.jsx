import { LinearGradient } from "expo-linear-gradient";
import { styled } from "nativewind";
import React from "react";
import { View, Dimensions } from "react-native";

const Container = styled(View);
export function ContainerWithBackgroundColor({
  children,
  gradients = ["#FFF", "#FFF"],
  containerProps = {},
}) {
  const { width, height } = Dimensions.get("screen");
  return (
    <>
      <Container style={{ width, height }} {...containerProps}>
        <LinearGradient
          className={"flex-1 "}
          style={{ width, height }}
          colors={gradients}
        >
          {children}
        </LinearGradient>
      </Container>
    </>
  );
}
