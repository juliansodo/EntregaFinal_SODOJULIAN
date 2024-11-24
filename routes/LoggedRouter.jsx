import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Navbar } from "../components";
import { HomeScreen, StoreScreen, CartScreen, DetailProduct, MyPlacesScreen, PlaceMapSelector, OrderDetail } from "../screens";
import ProfileScreen from "../screens/ProfileScreen";
import ProfileImageSelector from "../screens/ProfileImageSelector";

const Stack = createNativeStackNavigator();
export default function LoggedRouter() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="DetailProduct" component={DetailProduct} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ProfileImageSelector" component={ProfileImageSelector} />
        <Stack.Screen name="MyPlacesScreen" component={MyPlacesScreen} />
        <Stack.Screen name="PlaceMapSelector" component={PlaceMapSelector} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
      </Stack.Navigator>
      <Navbar />
    </>
  );
}
