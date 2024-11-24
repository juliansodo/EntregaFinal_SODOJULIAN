import React, { useContext } from "react";
import { View, FlatList } from "react-native";
import { ProductCard } from "./ProductCard";



export  function CardProductList({ products }) {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item}  />}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={5}
        className="p-5"
      />
    </View>
  );
}