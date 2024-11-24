import React, { useState } from "react";
import { ContainerWithBackgroundColor, CustomButton } from "../components";
import { View, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { setImageUser } from "../app/features/userSlice";
import { getUserProfile } from "../hooks";
import { useSetImageProfileMutation } from "../services/profileService";


export default function ProfileImageSelector({ navigation }) {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(useSelector((state) => state.user));
  const dispatch = useDispatch();
  const {setUserProfileImage} = getUserProfile();
  const [setImageProfile] = useSetImageProfileMutation();
  const verifyCameraPermissions = async () => {
    //- console.log("Verificando permisos de cámara");
    const granted = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      //- console.log("Permiso denegado");
      return false;
    } else {
      //- console.log("Permiso concedido");
      return true;
    }
  };

  const pickImage = async () => {
    const isCameraPermitted = await verifyCameraPermissions();
    if (isCameraPermitted) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [9,16],
        base64: true,
        quality: 0.2,
        
      });
      if(!result.canceled)
      {
        setImage("data:image/jpeg;base64," + result.assets[0].base64);
      }
    }
    
  };

  const confirmImage = async () => {
    //- console.log("Confirmando imagen");
    dispatch(setImageUser(image));
    //- console.log("Imagen a enviar", {user_id: user.user.localId, blobImage: image});
    setImageProfile({user_id: user.user.localId, blobImage: image});
    navigation.goBack();
};

  return (
    <ContainerWithBackgroundColor gradients={["#111d5d", "#111d5d"]}>
      <View className="flex-1 mt-32  items-center">
        <View>
          <Text className="text-white text-2xl mb-4 text-center">
            Cambiar foto de perfil
          </Text>

        </View>
        <View className="">
          <View className={!image?" w-[200px] h-[200px]  bg-white border-dotted border-blue-200 border-4":" w-[200px] h-[200px] "}>
            {image ? (
              <Image width={200} height={200} source={{uri:image}}></Image>
            ) : (
              <View className="flex-1 justify-center">
                <Text className="text-black text-center justify-center">
                  No hay imagen seleccionada
                </Text>
              </View>
            )}
          </View>

          <View>
          {image && <CustomButton
              text={"Confirmar foto"}
              textClasses={"text-white text-center"}
              buttonClasses={"bg-[#2e41a6] p-2 rounded-lg w-full mx-auto mt-4"}
              onPress={() => confirmImage()}
            ></CustomButton>}
          <CustomButton
              text={"Tomar una foto"}
              textClasses={"text-white text-center"}
              buttonClasses={"bg-[#2e41a6] p-2 rounded-lg w-full mx-auto mt-4"}
              onPress={() => pickImage()}
            ></CustomButton>
            <CustomButton
              text={"Volver"}
              textClasses={"text-white text-center"}
              buttonClasses={"bg-[#2e41a1] p-2 rounded-lg w-full mx-auto mt-4"}
              onPress={() => navigation.navigate("Profile")}
            ></CustomButton>
          </View>
        </View>
      </View>
    </ContainerWithBackgroundColor>
  );
}
