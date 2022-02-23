import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useState } from "react";

export default function Map() {
  const [height, setHeight] = useState(0);
  const { width } = Dimensions.get("window");

  const ProfileIcon = () => {
    /* 
    Image.getSize(require("../../../assets/tori.jpg"), (w, h) => {
      setHeight(h * (width / w));
    }); */
    return (
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "grey",
        }}
      ></View>
    );
  };

  // 공통 divider
  const Divider = () => (
    <View
      style={{
        width: "100%",
        height: 1,
        marginVertical: 10,
        backgroundColor: "#dddddd",
      }}
    ></View>
  );

  return (
    <View style={styles.mainView}>
      <Text style={styles.subTItle}>Ranking</Text>
      <Divider />
      <ScrollView horizontal style={styles.rankings}>
        <ProfileIcon />
        <ProfileIcon />
        <ProfileIcon />
        <ProfileIcon />
        <ProfileIcon />
      </ScrollView>
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  // 공통
  mainView: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  subTItle: {
    color: "black",
    paddingTop: 10,
  },
  rankings: {},
});
