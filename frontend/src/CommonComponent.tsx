import { useState } from "react";
import { View, Image, Text, Dimensions, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import getFonts from "./getFonts";

export const screenPadding = 20;
export const screenWidth = Dimensions.get("window").width - screenPadding * 2;
export const ipAddress = "172.30.1.31";

export const mainStyle = StyleSheet.create({
  mainView: {
    position: "relative",
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: screenPadding,
  },
});

export const Divider = () => (
  <View
    style={{
      width: "100%",
      height: 1,
      marginVertical: 10,
      backgroundColor: "#eeeeee",
    }}
  ></View>
);

export const ProfileIcon = ({ imagePath }) => {
  if (imagePath == null) imagePath = require("../assets/profile_default.jpg");
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5,
        backgroundColor: "grey",
        overflow: "hidden",
        elevation: 2,
      }}
    >
      <Image style={{ width: 50, height: 50 }} source={imagePath}></Image>
    </View>
  );
};

export function defaultFont(props) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const LoadFonts = async () => {
    await getFonts();
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => setIsReady(true)}
        onError={() => {}}
      />
    );
  }
  return (
    <Text style={{ ...styles.defaultFont, ...props.style }}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: "SpoqaBold",
  },
});
