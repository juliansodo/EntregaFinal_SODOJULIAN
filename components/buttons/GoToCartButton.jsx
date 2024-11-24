import React from "react";
import { Text, View, Pressable } from "react-native";
import { CustomButton } from "./CustomButton";
import { useNavigation } from "@react-navigation/native";

export function GoToCartButton({txtButtonClasses = '', txtClasses = ''}) {
    const navigation = useNavigation();
    const styleButtons = `bg-[#2e41a6] p-5 rounded-md hover:bg-purple-800 active:scale-95 transition-transform transform ${txtButtonClasses}`;
    const styleText = `text-white font-bold ${txtClasses}`;
  return (
    <CustomButton 
      text='Ir al carrito' 
      onPress={() => navigation.navigate('Cart')} 
      buttonClasses={styleButtons} 
      textClasses={styleText} 
    />
  );
}
