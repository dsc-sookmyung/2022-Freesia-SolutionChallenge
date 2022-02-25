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
import { Divider } from "../../CommonComponent";
import { Ionicons } from "@expo/vector-icons";

const numColumns = 3;
const screenWidth = Dimensions.get("window").width;
const screenPadding = 20;

const recentPostData = [
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

const rankingData = [
  {
    rank: 0,
    numberOfStickers: 5,
  },
  {
    rank: 1,
    numberOfStickers: 5,
  },
  {
    rank: 2,
    numberOfStickers: 5,
  },
  {
    rank: 3,
    numberOfStickers: 5,
  },
  {
    rank: 4,
    numberOfStickers: 5,
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
          justifyContent: "center",
          alignItems: "center",
          width: isUser ? 60 : 50,
          height: isUser ? 60 : 50,
          borderRadius: isUser ? 30 : 25,
          margin: 5,
          backgroundColor: "grey",
          overflow: "hidden",
          elevation: 2,
          borderWidth: isUser ? 3 : 0,
          borderColor: "#BAF1C9",
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

  const Ranking = ({ rank, numberOfStickers, isUser, imagePath }) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.ranking}>
      <ProfileIcon imagePath={imagePath} isUser={isUser} />

      <View style={styles.numberOfStickers}>
        <Text>{numberOfStickers}</Text>
      </View>
      {rank == "1st" ? (
        <Image
          style={styles.crownImg}
          source={require("../../../assets/crown.png")}
        ></Image>
      ) : null}
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
        <Ranking
          rank={"73st"}
          imagePath={null}
          isUser={true}
          numberOfStickers={25}
        />
        {rankingData.map((r, idx) => (
          <Ranking
            rank={rank[r.rank]}
            key={idx}
            isUser={false}
            imagePath={require("../../../assets/tori.jpg")}
            numberOfStickers={r.numberOfStickers}
          />
        ))}
      </ScrollView>
      <Divider />
      <FlatList
        data={recentPostData}
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
    position: "relative",
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
  numberOfStickers: {
    position: "absolute",
    right: 5,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 20,
    height: 20,
    borderRadius: 10,
    elevation: 2,
  },
  crownImg: {
    position: "absolute",
    top: -10,
    width: 50,
    height: 50,
  },
});
