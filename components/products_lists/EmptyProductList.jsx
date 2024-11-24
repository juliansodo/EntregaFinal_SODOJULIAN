import React from "react";
import { View, Text } from "react-native";

export  function EmptyProductList() {
  return (
    <View className="mx-auto">
      <Text className="text-white text-center text-2xl">
        No se han encontrado productos
      </Text>
    </View>
  );
}