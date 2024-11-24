import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import {
  ContainerWithBackgroundColor,
  CategoriesDropdown,
  ItemListContainer,
  StraightSkeleton,
} from "../components";
import {  useCategories, useProducts } from "../hooks";

export function StoreScreen() {
  const [categoryId, setCategoryId] = useState(null);
  useCategories();
  useProducts(categoryId);
  const {categories, loadingCategories} = useSelector((state) => state.categories);
  const products = useSelector((state) =>{  return state.products?.data});
  const loading = useSelector((state) =>state.products.isLoading);

  const [categoryName, setCategoryName] = useState("Todos los productos");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ContainerWithBackgroundColor gradients={["#111d5d", "#111d5d"]} >
        {loadingCategories ? (
          <View className="flex justify-center items-center mt-10 mb-2">
            <StraightSkeleton widthSkeleton={250} heightSkeleton={50} animationSkeleton={"wave"} className="rounded-full" />
          </View>
        ) : (
          <CategoriesDropdown
            categories={categories}
            setCategoryId={setCategoryId}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
          />
        )}

        {loading ? (
          <View className="flex justify-center items-center mt-1 mb-8">
            <StraightSkeleton width={330} height={138} className="rounded-lg mt-6" animation={"wave"} />
            <StraightSkeleton width={330} height={138} className="rounded-lg mt-6" animation={"wave"} />
            <StraightSkeleton width={330} height={138} className="rounded-lg mt-6" animation={"wave"} />
          </View>
        ) : (
          <View className="pb-10">
            <ItemListContainer type="card" products={products} />
          </View>
        )}
      </ContainerWithBackgroundColor> 
    </SafeAreaView>
  );
}
