import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import BottomSheet from "reanimated-bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Divider } from "../../CommonComponent";

const height = Dimensions.get("window").height;

export default function MapScreen({
  navigation,
  latitude,
  longitude,
  location,
}) {
  const centerInfo = [
    {
      centerName: "용산새일센터",
      centerAddress: "서울특별시 용산구 청파로 139-21",
      centerCall: "02-714-9763",
      websiteAddress: "www.naver.com",
    },
    {
      centerName: "용산새일센터",
      centerAddress: "서울특별시 용산구 청파로 139-21",
      centerCall: "02-714-9763",
      websiteAddress: "www.naver.com",
    },
    {
      centerName: "용산새일센터",
      centerAddress: "서울특별시 용산구 청파로 139-21",
      centerCall: "02-714-9763",
      websiteAddress: "www.naver.com",
    },
    {
      centerName: "용산새일센터",
      centerAddress: "서울특별시 용산구 청파로 139-21",
      centerCall: "02-714-9763",
      websiteAddress: "www.naver.com",
    },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHandle} />
    </View>
  );

  const CenterInfo = () => (
    <View>
      {centerInfo.map((c, idx) => (
        <View key={idx}>
          <Text style={styles.centerName}>{c.centerName}</Text>
          <Text>{c.centerAddress}</Text>
          <Text>{c.centerCall}</Text>
          <Text>{c.websiteAddress}</Text>
          <Divider />
        </View>
      ))}
    </View>
  );

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: 15,
        height: height * 0.8,
      }}
    >
      <CenterInfo />
    </View>
  );

  const sheetRef = React.useRef(null);
  return (
    <GestureHandlerRootView style={{ position: "relative" }}>
      <MapView
        style={{ height }}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: latitude - 0.02,
          longitude: longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          image={require("../../../assets/flower_pin_s.png")}
          title={location.city_gu}
        />
        <Marker
          coordinate={{
            latitude: latitude - 0.01,
            longitude: longitude + 0.01,
          }}
          image={require("../../../assets/custom_pin_shadow_s.png")}
          title={location.city_gu}
        />
        <Marker
          coordinate={{
            latitude: latitude - 0.02,
            longitude: longitude - 0.01,
          }}
          image={require("../../../assets/custom_pin_shadow_s.png")}
          title={location.city_gu}
        />
        <Marker
          coordinate={{
            latitude: latitude + 0.01,
            longitude: longitude + 0.02,
          }}
          image={require("../../../assets/custom_pin_shadow_s.png")}
          title={location.city_gu}
        />
        <Marker
          coordinate={{
            latitude: latitude + 0.005,
            longitude: longitude + 0.01,
          }}
          image={require("../../../assets/custom_pin_shadow_s.png")}
          title={location.city_gu}
        />
        <Marker
          coordinate={{
            latitude: latitude - 0.005,
            longitude: longitude - 0.01,
          }}
          image={require("../../../assets/custom_pin_shadow_s.png")}
          title={location.city_gu}
        />
        <Marker
          coordinate={{ latitude: 37.5, longitude: 127 }}
          image={require("../../../assets/custom_pin_shadow_s.png")}
          title={"Seoul"}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonSubContainer}>
          <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
            <View
              style={{
                backgroundColor: "white",
                width: 150,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                elevation: 5,
              }}
            >
              <Text>Open Center List</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={["70%", "40%", "0%"]}
        initialSnap={0}
        renderContent={renderContent}
        renderHeader={renderHeader}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHandle: {
    width: 40,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#00000040",
  },
  centerName: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 5,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    bottom: "25%",
    zIndex: 0,
  },
  buttonSubContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
