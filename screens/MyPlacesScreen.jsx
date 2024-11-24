import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { ContainerWithBackgroundColor, CustomButton } from "../components";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useGetLocationsQuery, useSaveLocationMutation } from "../services/userLocationService";
import { useSelector } from "react-redux";
export function MyPlacesScreen({ navigation }) {
  const {user} = useSelector(state => state.user);
  const [txtLocationName, setTxtLocationName] = useState("");
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [saveLocation] = useSaveLocationMutation();
  const {data: locationsData = [], isLoading} = useGetLocationsQuery(user?.localId, {
    skip: !user?.localId, 
  });
  useEffect(() => {
    setPlaces(locationsData.locations);
    console.info("loading", isLoading);
  }, [locationsData]);


  const locationChoosen = async (location, locationName) => {
    await savePlace(location, locationName);
  };
  const savePlace = async (location, locationName) => {
    let dataZone;
    if (location) {
      dataZone = await getInfoZone(location);
      setPlaces([
        ...places,
        {
          id: Math.random(),
          name: locationName,
          city: dataZone.city,
          latitude: location.latitude,
          longitude: location.longitude,
          street: dataZone.street,
          streetNumber: dataZone.streetNumber,
        },
      ]);
      await saveLocation({latitude: location.latitude, longitude: location.longitude, user_id: user.localId, name: locationName, city: dataZone.city, street: dataZone.street, streetNumber: dataZone.streetNumber});
    } else {
      if (txtLocationName !== "") {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          //- console.log("Permiso denegado");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        //- console.log(location);
        setUserLocation(location.coords);
        dataZone = await getInfoZone(location.coords);
        
        setPlaces([
          ...places,
          {
            id: Math.random(),
            name: txtLocationName,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            city: dataZone.city,
            street: dataZone.street,
            streetNumber: dataZone.streetNumber,
          },
        ]);

        await saveLocation({latitude: location.coords.latitude, longitude: location.coords.longitude, user_id: user.localId, name: txtLocationName, city: dataZone.city, street: dataZone.street, streetNumber: dataZone.streetNumber});
        setTxtLocationName("");
      }
    }
  };
  const getUserCoords = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };
  const getInfoZone = async (location) => {
    let info = await Location.reverseGeocodeAsync({
      latitude: location.latitude,
      longitude: location.longitude,
    });
    return info[0];
  };
  useEffect(() => {
    (async () => {
      await getUserCoords();
    })();
  }, [places]);

  return (
    <ContainerWithBackgroundColor gradients={["#111d5d", "#111d5d"]}>
      <View className="flex-1">
        <View className="items-center mt-3">
          <Text className="text-3xl text-white">Mis lugares</Text>
        </View>
        <View className="mt-10 items-center">
          <Text className="text-white text-md mb-2">Agregar lugar</Text>
        </View>
        <View className="px-10 flex-row space-x-2">
          <TextInput
            className=" bg-white px-2 text-md h-8 w-[80%] rounded-lg"
            onChangeText={(value) => setTxtLocationName(value)}
            placeholder="Nombre del lugar"
            placeholderTextColor={"black"}
            value={txtLocationName}
          ></TextInput>
          <CustomButton
            text={<MaterialIcons name="location-on" size={25} color="black" />}
            textClasses={"text-center py-1"}
            buttonClasses={"bg-gray-100 rounded-lg  w-[10%]"}
            onPress={() =>
              navigation.navigate("PlaceMapSelector", {
                locationChoosen: locationChoosen,
                userLocation: userLocation,
              })
            }
          ></CustomButton>
          <CustomButton
            text={<MaterialIcons name="check" size={25} color="green" />}
            textClasses={"text-center py-1"}
            buttonClasses={"bg-gray-100 rounded-lg  w-[10%]"}
            onPress={() => savePlace()}
          ></CustomButton>
        </View>
        <View>
          <Text className="text-white text-center mt-5 mb-2">
            Aquí podrás ver los lugares guardados
          </Text>
        </View>
        {places && (
          <View className="px-5 h-[52%] scrollbar-show scroll-mx-11">
            <FlatList
              data={places}
              renderItem={({ item }) => <LocationCard place={item} />}
              keyExtractor={(item) => item.id.toString()}
            ></FlatList>
          </View>
        )}
      </View>
    </ContainerWithBackgroundColor>
  );
}

const LocationCard = ({ place }) => {
  return (
    <View className="bg-white p-3 rounded-lg mt-2 flex-row space-x-3 ">
      <View>
        <MapView
          style={{ width: 200, height: 100 }}
          initialRegion={{
            latitude: place.latitude,
            longitude: place.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          zoomEnabled={false}
          zoomControlEnabled={false}
          zoomTapEnabled={false}
          
        >
          <Marker
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
          />
        </MapView>
      </View>
      <View className="flex-col space-y-1 max-w-[30%] ">
        <View>
          <Text className="text-black text-md w-100 font-bold">
            {place.name}
          </Text>
        </View>
        <View className="flex-row flex-wrap">
          <Text className="text-black font-bold text-md">
            {place.city}
          </Text>
          <Text className="text-black text-md">
            {place.street} {place.streetNumber}
          </Text>
        </View>
      </View>
    </View>
  );
};
