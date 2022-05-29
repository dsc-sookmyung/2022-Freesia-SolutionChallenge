import { useState } from "react";
import { View, Image, Text, Dimensions, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import getFonts from "./getFonts";
import { theme } from "./color";

export const screenPadding = 20;
export const screenWidth = Dimensions.get("window").width - screenPadding * 2;
export const screenHeight = Dimensions.get("window").height;
//export const BASE_URL = `https://iamyourfreesia.site`;
export const BASE_URL = `http://172.30.1.25:8080`;

export const mainStyle = StyleSheet.create({
  mainView: {
    position: "relative",
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: screenPadding,
  },
  textInput: {
    width: 300,
    elevation: 2,
    borderRadius: 50,
    backgroundColor: "white",
    marginVertical: 12,
    padding: 5,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    backgroundColor: theme.headerBg,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 40,
    borderRadius: 20,
    marginVertical: 20,
  },
  buttonTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
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

export const ProfileIcon = ({ imagePath, size }) => {
  if (imagePath == null) imagePath = require("../assets/profile_default.jpg");
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 100,
        margin: 5,
        backgroundColor: "grey",
        overflow: "hidden",
        elevation: 2,
      }}
    >
      <Image style={{ width: size, height: size }} source={imagePath}></Image>
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
