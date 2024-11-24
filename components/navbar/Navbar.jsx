import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { styled } from "nativewind";
import { QtyProductsInCartTag } from "../tags/QtyProductsInCartTag";
import { useNavigation } from "@react-navigation/native";


const StyledView = styled(View);
const StyledText = styled(Text);

const rutas = [
  {
    nombre: "Inicio",
    icono: "home",
    componenteIcon: Ionicons,
    star: false,
    children: null,
    screen: 'Home'
  },
  {
    nombre: "Tienda",
    icono: "store",
    componenteIcon: FontAwesome5,
    star: true,
    children: null,
    screen: 'Store'
  },
  {
    nombre: "Carrito",
    icono: "shopping-cart",
    componenteIcon: FontAwesome5,
    star: false,
    children: QtyProductsInCartTag,
    screen: 'Cart'
  },
];

export function Navbar() {
    const navigation = useNavigation();
  return (
    <StyledView className="flex-row justify-around items-center bg-[#2d3c91] p-4 absolute bottom-0 left-0 right-0 h-16 rounded-tl-[30] rounded-tr-[30]">
      {rutas.map((ruta, index) => (
        <Pressable key={index} onPress={() => {console.log(ruta.nombre); navigation.navigate(ruta.screen)}}>
          <StyledView
            className={`items-center ${ruta.star ? "relative -top-6" : ""}`}
          >
            {ruta.children && <ruta.children />}
            <StyledView
              className={`items-center justify-center ${
                ruta.star ? " bg-[#4255c2] rounded-full w-16 h-16 border-2 border-[#dedede] shadow-md shadow-black" : ""
              }`}
            >
              <ruta.componenteIcon
                name={ruta.icono}
                size={ruta.star ? 28 : 24}
                color={ruta.star ? "#dedede" : "white"}
              />
            </StyledView>
            <StyledText
              className={`text-sm mt-1 ${
                ruta.star ? "text-white" : "text-white"
              }`}
            >
              {ruta.nombre}
            </StyledText>
          </StyledView>
        </Pressable>
      ))}
    </StyledView>
  );
}
