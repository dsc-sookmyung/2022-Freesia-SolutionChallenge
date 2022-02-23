import { View, Image } from "react-native";

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
