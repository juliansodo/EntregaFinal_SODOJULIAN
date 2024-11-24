import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { ContainerWithBackgroundColor } from "../components/";
import MapView, { Marker } from "react-native-maps";
import { CustomButton } from "../components";
export function PlaceMapSelector({ navigation, route }) {
  const { locationChoosen, userLocation } = route.params;
  const [markerPosition, setMarkerPosition] = useState({
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
  });
  const [locationName, setLocationName] = useState("");
  return (
    <ContainerWithBackgroundColor gradients={["#111d5d", "#111d5d"]}>
      <View className="flex-1">
        <View className="items-center mt-3">
          <Text className="text-3xl text-white">Elegir ubicación</Text>
        </View>
        <View className="items-center mt-2">
            <TextInput
                className="bg-white px-2 text-md h-8 w-[80%] rounded-lg"
                onChangeText={(value) => setLocationName(value)}
                placeholder="Nombre del lugar"
                placeholderTextColor={"black"}
                value={locationName}
            ></TextInput>
        </View>
        <View className="flex-1 items-center mt-2">
          <MapView
            style={{ width: "80%", height: "60%" }}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onRegionChange={(region) => {
              setMarkerPosition({
                latitude: region.latitude,
                longitude: region.longitude,
              });
            }}
          > 
            <Marker
              coordinate={markerPosition}
              draggable={true}
              onDragEnd={(e) => {
                setMarkerPosition(e.nativeEvent.coordinate);
              }}
            />
          </MapView>
          <View className="items-center mt-2">
            <CustomButton
              text="Seleccionar ubicación"
              onPress={() => {
                if(locationName.length > 0) {
                    navigation.goBack();
                    locationChoosen(markerPosition, locationName);
                }
              }}
              buttonClasses={"bg-blue-500 text-white rounded-lg px-4 py-2"}
              textClasses={"text-white"}
            />
          </View>
        </View>
      </View>
    </ContainerWithBackgroundColor>
  );
}
