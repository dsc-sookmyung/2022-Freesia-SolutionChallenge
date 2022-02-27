import React from "react";
import { Text, View, Button, Dimensions, StyleSheet } from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import BottomSheet from "reanimated-bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const height = Dimensions.get("window").height;

export default function Map() {
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHandle} />
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
      <Text>Swipe down to close!!</Text>
    </View>
  );

  const sheetRef = React.useRef(null);
  return (
    <GestureHandlerRootView style={{ position: "relative" }}>
      <MapView style={{ height }} provider={PROVIDER_GOOGLE}>
        <Marker
          coordinate={{ latitude: 37.5, longitude: 127 }}
          image={require("../../../assets/pin_s.png")}
          title={"Seoul"}
        />
      </MapView>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          position: "absolute",
          bottom: "25%",
          zIndex: 0,
        }}
      >
        <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        />
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
