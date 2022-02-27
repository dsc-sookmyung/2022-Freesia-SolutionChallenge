import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import MapScreen from "../components/map/MapScreen";
import { Ionicons } from "@expo/vector-icons";

import { screenWidth } from "../CommonComponent";
import { theme } from "../color";

export default function MapStackScreen() {
  const MapStack = createStackNavigator();

  const CustomHeader = () => {
    console.log();
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
          <Ionicons
            style={{ marginRight: 5 }}
            name="location-sharp"
            size={24}
            color="black"
          />
          <Text>내위치</Text>
        </View>
      </View>
    );
  };

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
        component={MapScreen}
        options={{ headerTitle: () => <CustomHeader /> }}
      />
    </MapStack.Navigator>
  );
}
