import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Divider, ProfileIcon } from "../../CommonComponent";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../color";

const numColumns = 3;
const screenWidth = Dimensions.get("window").width;
const screenPadding = 20;

const DATA = [
  {
    id: "1",
    title: "first",
  },
  {
    id: "2",
    title: "second",
  },
  {
    id: "3",
    title: "third",
  },
  {
    id: "4",
    title: "fourth",
  },
  {
    id: "5",
    title: "five",
  },
  {
    id: "6",
    title: "six",
  },
  {
    id: "7",
    title: "seven",
  },
];

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

export default function Map() {
  const ProfileIcon = ({ imagePath, isUser }) => {
    if (imagePath == null)
      imagePath = require("../../../assets/profile_default.jpg");
    return (
      <View
        style={{
          width: isUser ? 60 : 50,
          height: isUser ? 60 : 50,
          borderRadius: isUser ? 30 : 25,
          margin: 5,
          backgroundColor: "grey",
          overflow: "hidden",
          elevation: 2,
        }}
      >
        <Image
          style={{ width: isUser ? 60 : 50, height: isUser ? 60 : 50 }}
          source={imagePath}
        ></Image>
      </View>
    );
  };

  const PostItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.postView}>
        <Text>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const Ranking = ({ rank }) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.ranking}>
      <ProfileIcon
        imagePath={require("../../../assets/tori.jpg")}
        isUser={false}
      />
      <Text>{rank}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainView}>
      <Text style={styles.subTItle}>Ranking</Text>
      <Divider />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.rankingScrollView}
      >
        <View style={styles.ranking}>
          <ProfileIcon imagePath={null} isUser={true} />
          <Text>me</Text>
        </View>
        {rank.map((r, idx) => (
          <Ranking rank={r} key={idx} />
        ))}
      </ScrollView>
      <Divider />
      <FlatList
        data={DATA}
        renderItem={PostItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
      <TouchableOpacity activeOpacity={0.8} style={styles.writePost}>
        <Ionicons
          style={styles.writePostIcon}
          name="add-circle"
          size={65}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    position: "relative",
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: screenPadding,
  },
  subTItle: {
    color: "black",
    paddingTop: 10,
  },
  rankingScrollView: { flexGrow: 0 },
  ranking: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  postView: {
    backgroundColor: "#eeeeee",
    width: ((screenWidth - screenPadding * 2) * 0.96) / numColumns,
    height: ((screenWidth - screenPadding * 2) * 0.96) / numColumns,
    margin: ((screenWidth - screenPadding * 2) * 0.04) / (numColumns * 2),
  },
  writePost: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  writePostIcon: {
    color: "#ffd25E",
  },
});
