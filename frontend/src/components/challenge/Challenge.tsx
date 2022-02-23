import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Divider } from "../../CommonComponent";
import { ProfileIcon } from "../../CommonComponent";

export default function Map() {
  const rank: string[] = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
  ];

  return (
    <View style={styles.mainView}>
      <Text style={styles.subTItle}>Ranking</Text>
      <Divider />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.rankings}
      >
        <View style={styles.ranking}>
          <ProfileIcon imagePath={null} />
          <Text>me</Text>
        </View>
        {rank.map((r) => (
          <View style={styles.ranking}>
            <ProfileIcon imagePath={require("../../../assets/tori.jpg")} />
            <Text>{r}</Text>
          </View>
        ))}
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
  rankings: { flexGrow: 0 },
  ranking: {
    justifyContent: "center",
    alignItems: "center",
  },
});
