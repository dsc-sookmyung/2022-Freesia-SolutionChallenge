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
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";

import BottomSheet from "reanimated-bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Divider } from "../../CommonComponent";

Geocoder.init("AIzaSyAPEIGEf12unqTi_6if8i_okJEdgCPIeFY");
const height = Dimensions.get("window").height;

export default function Map() {
  const [latLon, setLatLon] = useState({ lat: 0, lon: 0 });
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState("");

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

    Geocoder.from(latitude, longitude)
      .then((json) => {
        var addressComponent = json.results[0].address_components;
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
          latitude: latLon.lat - 0.02,
          longitude: latLon.lon,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: latLon.lat, longitude: latLon.lon }}
          image={require("../../../assets/flower_pin.png")}
          title={"Seoul"}
        />
        <Marker
          coordinate={{ latitude: 37.5, longitude: 127 }}
          image={require("../../../assets/pin_s.png")}
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

{
  /* <GestureHandlerRootView style={{ position: "relative" }}>
  <MapView style={{ height }} provider={PROVIDER_GOOGLE}>
    <Marker
      coordinate={{ latitude: 37.5, longitude: 127 }}
      image={require("../../../assets/pin_s.png")}
      title={"Seoul"}
    />
  </MapView>
  <View
    style={{
      position: "absolute",
      top: 50,
      right: (screenWidth + screenPadding * 2) / 2,
    }}
  >
    <Button
      title="Open Bottom Sheet"
      onPress={() => sheetRef.current.snapTo(0)}
    />
  </View>
  <BottomSheet
    ref={sheetRef}
    snapPoints={["0%", "50%", "100%"]}
    initialSnap={0}
    callbackNode={fall}
    renderContent={renderContent}
    renderHeader={renderHeader}
  />
  <Animated.View
    style={{
      margin: 20,
      opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}
  ></Animated.View>
</GestureHandlerRootView>; */
}

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
