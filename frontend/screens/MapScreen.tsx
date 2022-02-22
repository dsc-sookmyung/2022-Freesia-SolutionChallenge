import React from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const height = Dimensions.get("window").height;

export default function MapScreen({ navigation }: any) {
  const { colors } = useTheme();

  return (
    <MapView
      style={{ height }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 37.5,
        longitude: 127,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{ latitude: 37.5, longitude: 127 }}
        image={require("../assets/pin_s.png")}
        title={"Seoul"}
      />
    </MapView>
  );
}
