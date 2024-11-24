import React, { useEffect } from "react";
import { View } from "react-native";
import {
  ContainerWithBackgroundImage,
  Title,
  GoToStoreButton,
  CustomButton
} from "../components";
import imagen from "../assets/backgrounds/imagen1.png";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDispatch } from "react-redux";
import { clearUser } from "../app/features/userSlice";
import { getUserProfile } from "../hooks";
import { clearSessions } from "../localDb";


export function HomeScreen() {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View className="flex-1 bg-white">
      <ContainerWithBackgroundImage imageUrl={imagen} className="items-center justify-center">
        <View className={'absolute right-1 flex flex-row'}>
          <View className={'mr-10'}>
            <CustomButton icon={<MaterialIcons name="exit-to-app" size={35} color="white" />} textClasses={'mt-7'} onPress={() => {dispatch(clearUser()); clearSessions()}}></CustomButton>
          </View>
          <View className={'mr-10'}>
            <CustomButton icon={<MaterialIcons name="person" size={35} color="white" />} textClasses={'mt-7'} onPress={() => {navigation.navigate("Profile")}}></CustomButton>
          </View>
          <View>
            <CustomButton icon={<MaterialIcons name="location-on" size={35} color="white" />} textClasses={'mt-7'} onPress={() => {navigation.navigate("MyPlacesScreen")}}></CustomButton>
          </View>
        </View>
        <View className=" flex-1 items-center justify-center">
          <View className="items-center justify-center">
            <Title 
              text="Encontrá todo para tu mascota al mejor precio" 
              highlights={["todo", "mejor precio"]} 
              textColor="white" 
              highlightColor="#1405e2"
            /> 
          </View>
          <View className="mt-10">
            <GoToStoreButton label="Ir a la tienda" onPressHandler={() => navigation.navigate('Store')} />
          </View>
        </View>
      </ContainerWithBackgroundImage>
    </View>
  );
}
