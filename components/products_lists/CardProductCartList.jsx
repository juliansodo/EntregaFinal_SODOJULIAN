import React, { useContext } from "react";
import { FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { CartContext } from "../../context/CartContext";
import { AddOrRmvProducts } from "../store/AddOrRmvProducts";
export function CardProductCartList({ products, onRemove, isEdit=true }) {
const {removeProduct} = useContext(CartContext);

  const renderItem = ({ item }) => {
    return (
      <View className="flex-row items-center p-4 bg-white border-b border-gray-200 rounded-2xl mb-2">
        <Image
          source={{ uri: item.imagen }}
          className="w-20 h-20 rounded-md mr-4"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold">{item.nombre}</Text>
          <Text className="text-gray-600">${item.precio.toFixed(2)}</Text>
          <Text className="text-sm text-gray-500">Cantidad: {item.cantidad}</Text>
          {isEdit && <AddOrRmvProducts product={item} textButtonClasses='text-sm px-2' textQtyClasses='text-sm text-black' disabledButtonClasses='text-black text-xl px-6 py-1'/>}
        </View>
        {isEdit && <TouchableOpacity onPress={() => removeProduct(item, true)} className="p-2">
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>}
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      initialNumToRender={5}
      className="p-10"
    />
  );
}
