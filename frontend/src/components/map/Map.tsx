import React from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { NavigationContainer } from "@react-navigation/native";

import CenterListScreen from "./CenterListScreen";
import MapScreen from "./MapScreen";

const height = Dimensions.get("window").height;

export default function Map() {
  const { colors } = useTheme();

  return (
    <MapView style={{ height }} provider={PROVIDER_GOOGLE}>
      <Marker
        coordinate={{ latitude: 37.5, longitude: 127 }}
        image={require("../assets/pin_s.png")}
        title={"Seoul"}
      />
    </MapView>
  );

  /*
  <Drawer.Navigator initialRouteName="MapScreen">
      <Drawer.Screen name="MapScreen" component={MapScreen} />
      <Drawer.Screen name="CenterListScreen" component={CenterListScreen} />
    </Drawer.Navigator>
   */
  /* <MapView
        style={{ height }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.5,
          longitude: 127,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.5, longitude: 127 }}
          image={require("../assets/pin_s.png")}
          title={"Seoul"}
        />
      </MapView> */
}
