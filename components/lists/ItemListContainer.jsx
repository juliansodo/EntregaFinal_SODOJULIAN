import React from "react";
import { View } from "react-native";
import { EmptyProductList } from "../products_lists/EmptyProductList";
import { CardProductList } from "../products_lists/CardProductList";
import { CardProductCartList } from "../products_lists/CardProductCartList";

export function ItemListContainer({ type, products, isEdit=true }) {
  //- console.log(products)
  if (!products || products.length === 0) {
    return <EmptyProductList />;
  }

  return (
    <>
      {type === "card" ? (
        <View className="max-h-[80vh] pb-16">
          <CardProductList products={products} />
        </View>
      ) : type === "list" ? (
        <View className="max-h-[70vh]">
          <CardProductCartList products={products} isEdit={isEdit} />
        </View>
      ) : null}
    </>
  );
}
