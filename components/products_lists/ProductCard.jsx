import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { AddOrRmvProducts } from "../store/AddOrRmvProducts";
import { CucardaDiscount } from "../store/CucardaDiscount";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export  function ProductCard({ product }) {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => {
      navigation.navigate("DetailProduct", { product: product })
    }}>
      <View className="flex flex-row rounded-2xl w-full bg-white shadow-xl mt-4 py-4 border-white border-3" >
        {product.descuento > 0 && <CucardaDiscount qty={product.descuento} />}
        <View className="flex flex-row mr-4">
          <Image
            source={{ uri: product.imagen }}
            alt="Card Preview"
            className="rounded-t-2xl w-20 h-20"
          />
        </View>

        <View className="flex flex-shrink w-80">
          <Text className="text-[17px] font-bold text-gray-700 pb-3 text-center">
            {product.nombre}
          </Text>
          <Text
            className="text-sm text-gray-700 mb-1"
            lineBreakMode="tail"
            numberOfLines={2}
          >
            {product.descripcion}
          </Text>
          <View className="flex flex-row justify-center items-center space-x-3">
            {product.descuento > 0 ? (
              <>
                <Text className="text-lg text-[#111d5d] font-bold">
                  ${product.precio_final + "  "}
                </Text>
                <Text className="text-md text-[#111d5d] line-through">
                  ${product.precio}
                </Text>
              </>
            ) : (
              <Text className="text-lg text-[#111d5d] font-bold">
                ${product.precio}
              </Text>
            )}
            <AddOrRmvProducts product={product} />
          </View>
        </View>
        <View className="flex flex-row justify-center items-center px-3">
          <FontAwesome5 name="chevron-right" size={24} />
        </View>
      </View>
      </Pressable>
  );
}