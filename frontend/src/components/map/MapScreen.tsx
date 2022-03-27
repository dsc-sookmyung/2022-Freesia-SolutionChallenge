import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Linking,
  Animated,
} from "react-native";

import Geocoder from "react-native-geocoding";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

import BottomSheet from "reanimated-bottom-sheet";
import { Feather } from "@expo/vector-icons";

import {
  BASE_URL,
  Divider,
  screenHeight,
  screenPadding,
  screenWidth,
} from "../../CommonComponent";
import { theme } from "../../color";

const height = Dimensions.get("window").height;

export default function MapScreen({
  navigation,
  latitude,
  longitude,
  location,
  cityKr,
}) {
  const [centerInfo, setCenterInfo] = useState([]);
  const [isOnlyCenter, setIsOnlyCenter] = useState(true);

  const cardWidth = screenWidth - 70;

  const baseUrl = `https://iamyourfreesia.site`;

  // 센터 정보 GET, 위도 경도 Geocoding
  const getCenterInfo = async () => {
    try {
      const response = await fetch(`${baseUrl}/center?address=${cityKr}`, {
        method: "GET",
      });
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
      json.length > 1 ? setIsOnlyCenter(false) : setIsOnlyCenter(true);
      setCenterInfo(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCenterInfo();
    return;
  }, []);

  /* const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHandle} />
    </View>
  ); */

  // 센터 리스트 출력 함수
  const CenterInfo = () => (
    <ScrollView
      scrollEventThrottle={1}
      ref={_scrollView}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: isOnlyCenter ? 0 : 20,
        paddingVertical: 20,
      }}
    >
      {centerInfo.map((c, idx) => (
        <TouchableOpacity
          activeOpacity={100}
          key={idx}
          style={{
            ...styles.centerCard,
            width: isOnlyCenter ? screenWidth : cardWidth,
          }}
        >
          <Text style={styles.centerName}>{c.name}</Text>
          <Divider />
          <Text>{c.address}</Text>
          <Text style={{ fontWeight: "700", marginTop: 6 }}>{c.contact}</Text>
          <TouchableOpacity
            style={styles.linkView}
            onPress={() => Linking.openURL(c.websiteUrl)}
          >
            <Text style={styles.linkText}>Go To Website</Text>
            <Feather name="external-link" size={15} color="black" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  /* const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: 15,
        height: height * 0.7,
      }}
    >
      {centerInfo == [] ? (
        <Text>There are no centers around</Text>
      ) : (
        <CenterInfo />
      )}
    </View>
  ); */

  // 마커 선택시 이동 함수
  const handleMarkerPress = (mapEventData) => {
    const markerId = mapEventData.nativeEvent.id;
    const x = cardWidth * markerId;

    _scrollView.current?.scrollTo({ x: x });
  };

  //const _sheetRef = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <GestureHandlerRootView style={{ position: "relative" }}>
      <MapView
        style={{ height }}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          image={require("../../../assets/flower_pin_s.png")}
          title="me"
        />
        {centerInfo.map((c, idx) => (
          <Marker
            key={idx}
            identifier={idx.toString()}
            onPress={(e) => handleMarkerPress(e)}
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
        <CenterInfo />
      </View>
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
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    bottom: "13%",
    zIndex: 0,
  },
  buttonSubContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  linkView: {
    flexDirection: "row",
    position: "absolute",
    bottom: 28,
    left: 28,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.pointCol,
  },
  linkText: {
    fontWeight: "700",
    marginRight: 4,
  },
  centerCard: {
    marginHorizontal: screenPadding,
    height: screenHeight / 5,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 28,
    elevation: 6,
  },
});

{
  {
    /* <View style={styles.buttonSubContainer}>
          <TouchableOpacity onPress={() => _sheetRef.current.snapTo(0)}>
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
        </View> */
  }
  /* buttonContainer: {
    bottom:"25%"
  } */
  /* <BottomSheet
        ref={_sheetRef}
        snapPoints={["70%", "40%", "0%"]}
        initialSnap={0}
        renderContent={renderContent}
        renderHeader={renderHeader}
      /> */
}
