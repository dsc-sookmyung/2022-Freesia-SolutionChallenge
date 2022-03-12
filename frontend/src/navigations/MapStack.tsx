import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

import MapScreen from "../components/map/MapScreen";
import Geocoder from "react-native-geocoding";

import { screenWidth } from "../CommonComponent";
import { theme } from "../color";

Geocoder.init("AIzaSyAPEIGEf12unqTi_6if8i_okJEdgCPIeFY");

export default function MapStackScreen() {
  const [latLon, setLatLon] = useState({ lat: 0, lon: 0 });
  const [location, setLocation] = useState({});
  const [locationName, setLocationName] = useState("");
  const [cityKr, setCityKr] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const MapStack = createStackNavigator();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({});
    setLatLon({ lat: latitude, lon: longitude });

    const locationKr = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    locationKr[0].city == null
      ? setCityKr(locationKr[0].district)
      : setCityKr(locationKr[0].city);

    Geocoder.from(latitude, longitude)
      .then((json) => {
        var addressComponent = json.results[0].address_components;
        setLocation({
          city_do: addressComponent[4].long_name,
          city_si: addressComponent[3].long_name,
          city_gu: addressComponent[2].long_name,
        });
        setLocationName(
          addressComponent[4].long_name +
            " " +
            addressComponent[3].long_name +
            " " +
            addressComponent[2].long_name
        );
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    getLocation();
  }, []);

  const CustomHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: screenWidth,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, letterSpacing: 0 }}>
          Centers Around Me
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="location-sharp" size={18} color="black" />
          <Text style={{ fontSize: 11, paddingLeft: 4 }}>{locationName}</Text>
        </View>
      </View>
    );
  };

  const MapScreenComponent = ({ navigation }) => (
    <MapScreen
      navigation={navigation}
      latitude={latLon.lat}
      longitude={latLon.lon}
      location={location}
      cityKr={cityKr}
    />
  );

  return (
    <MapStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.headerBg,
        },
      }}
    >
      <MapStack.Screen
        name="MapScreen"
        component={MapScreenComponent}
        options={{ headerTitle: () => <CustomHeader /> }}
      />
    </MapStack.Navigator>
  );
}
