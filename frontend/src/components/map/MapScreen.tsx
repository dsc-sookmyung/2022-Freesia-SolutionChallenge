import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Linking,
} from "react-native";

import Geocoder from "react-native-geocoding";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

import BottomSheet from "reanimated-bottom-sheet";
import { Feather } from "@expo/vector-icons";

import { Divider } from "../../CommonComponent";

const height = Dimensions.get("window").height;

export default function MapScreen({
  navigation,
  latitude,
  longitude,
  location,
  cityKr,
}) {
  const [centerInfo, setCenterInfo] = useState([]);
  const [geocoding, setGeocoding] = useState(false);
  const getCenterInfo = async () => {
    try {
      const response = await fetch(
        `http://172.30.1.3:8080/api/center?address=${cityKr}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      const messages = await Promise.all(
        json.map(async (c) => {
          try {
            const centerAddress = await Geocoder.from(c.address);
            const { lat, lng } = centerAddress.results[0].geometry.location;
            c.lat = lat;
            c.lng = lng;
          } catch (error) {
            console.warn(error);
          }
          return true;
        })
      );
      setCenterInfo(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCenterInfo();
    return () => setGeocoding(true);
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHandle} />
    </View>
  );

  const CenterInfo = () => (
    <ScrollView>
      {centerInfo.map((c, idx) => (
        <View key={idx}>
          <Text style={styles.centerName}>{c.name}</Text>
          <Text>{c.address}</Text>
          <Text>{c.contact}</Text>
          <TouchableOpacity
            style={styles.linkView}
            onPress={() => Linking.openURL(c.websiteUrl)}
          >
            <Text style={styles.linkText}>홈페이지</Text>
            <Feather name="external-link" size={15} color="black" />
          </TouchableOpacity>
          <Divider />
        </View>
      ))}
    </ScrollView>
  );

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: 15,
        height: height * 0.7,
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
        {centerInfo.map((c, idx) => (
          <Marker
            key={idx}
            coordinate={{
              latitude: c.lat,
              longitude: c.lng,
            }}
            image={require("../../../assets/custom_pin_shadow_s.png")}
            title={c.name}
          />
        ))}
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
  linkView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  linkText: {
    fontWeight: "700",
    marginRight: 4,
  },
});
