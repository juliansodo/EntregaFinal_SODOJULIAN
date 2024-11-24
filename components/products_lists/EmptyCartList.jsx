import React from "react";
import { View, Text } from "react-native";
import { CustomButton } from "../buttons/CustomButton";
import { useNavigation } from "@react-navigation/native";

export function EmptyCartList() {
    const navigation = useNavigation();

    return (
    <View className=" justify-center items-center h-full">
      <Text className="text-white text-center text-lg mb-4">
        No se han encontrado productos en el carrito
      </Text>
      <CustomButton 
        text='Ir a la tienda' 
        onPress={() => navigation.navigate('Store')}  
        buttonClasses='bg-[#2e41a6] p-4 rounded-lg ' 
        textClasses='text-md text-white'
      />
    </View>
  );
}