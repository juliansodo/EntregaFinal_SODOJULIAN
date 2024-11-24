import React, { useState, useEffect } from "react";
import { Text, View, Image, FlatList } from "react-native";
import { ContainerWithBackgroundColor, CustomButton, StraightSkeleton } from "../components";
import { useSelector } from "react-redux";
import emptyProfileImage from "../assets/images/emptyProfileImage.png";
import { useNavigation } from "@react-navigation/native";
import { useGetOrdersQuery } from "../services/purchaseService";
import { useGetImageProfileQuery } from "../services/profileService";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const userRedux = useSelector((state) => state.user);
  const [user, setUser] = useState(userRedux.user);
  const [imageProfile, setImageProfile] = useState(user.image);
  const [image, setImage] = useState(null);
  const { data: imageProfileData, error: imageProfileError, isLoading: isLoadingImageProfile } = useGetImageProfileQuery(user.localId);
  const { data: orders, isLoading: isLoadingOrders } = useGetOrdersQuery(
    user.localId
  );
  useEffect(() => {
    setUser(userRedux.user);
  }, [userRedux]);
  useEffect(() => {
    if (imageProfileData) {
      //- console.log("imageProfileData", imageProfileData);
      setImageProfile(imageProfileData.blobImage);
      setImage(imageProfileData.blobImage);

    }
  }, [imageProfileData]);
  return (
    <ContainerWithBackgroundColor gradients={["#111d5d", "#111d5d"]}>
      <View className="h-16 bg-[#abb3e2] items-center justify-center">
        <Text className="text-[#111d5d] text-2xl ">Perfil</Text>
      </View>
      <View className="p-5">
        <View className="p-5 rounded-lg bg-[#666f9d]">
          <View className="mx-auto mb-2">
            {isLoadingImageProfile ? (
              <StraightSkeleton width={100} height={100} className="rounded-full" />
            ) : image ? (
              <Image
                source={{ uri: image }}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <Image
                source={emptyProfileImage}
                style={{ width: 100, height: 100 }}
              />
            )}
          </View>
          <CustomButton
            buttonClasses={"p-3 w-full bg-[#111d5d] rounded-lg"}
            textClasses={"text-white text-center"}
            text={"Cambiar foto de perfil"}
            onPress={() => {
              navigation.navigate("ProfileImageSelector");
            }}
          ></CustomButton>
        </View>
        <View className="p-5 rounded-lg bg-[#666f9d] mt-5">
          <View className="mx-auto mb-2">
            <Text className="text-white text-center font-bold text-lg">
              Mis compras
            </Text>
          </View>
          {isLoadingOrders ? (
            <View>
              <StraightSkeleton height={50} className="mb-2" />
              <StraightSkeleton height={50} className="mb-2" />
              <StraightSkeleton height={50} />
            </View>
          ) : orders && orders.orders && orders.orders.length > 0 ? (
            <FlatList
              data={orders.orders}
              renderItem={({ item }) => <OrderCard order={item} />}
              className="max-h-[30vh] "
            />
          ) : (
            <Text>No hay compras</Text>
          )}
        </View>
      </View>
    </ContainerWithBackgroundColor>
  );
}

const OrderCard = ({ order }) => {
  const navigation = useNavigation();
  return <CustomButton text={"Compra ID: " + order.id + " \n $" + order.finalAmount} buttonClasses={"p-3 w-full bg-[#111d5d] rounded-lg mb-2"} textClasses={"text-white text-center"} onPress={() => {
    navigation.navigate("OrderDetail", { order: order });
  }} />;
};

