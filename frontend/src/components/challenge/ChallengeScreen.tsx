import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Divider,
  mainStyle,
  screenWidth,
  ipAddress,
} from "../../CommonComponent";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../axiosInstance";

const numColumns = 3;
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

export default function ChallengScreen({ navigation }) {
  const [postData, setPostData] = useState([]);

  const getPostData = async () => {
    axiosInstance
      .get(`/auth/challenge/list`)
      .then(function (response) {
        setPostData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPostData();
  }, []);

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
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.postView}
        onPress={() => navigation.navigate("ChallengeDetailScreen")}
      >
        <Image
          style={styles.postView}
          source={require("../../../assets/tori.jpg")}
        />
        <Text>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const Ranking = ({ rank, numberOfStickers, isUser, imagePath }) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.ranking}>
      {rank == "1st" ? (
        <Image
          style={styles.crownImg}
          source={require("../../../assets/crown.png")}
        ></Image>
      ) : null}
      <ProfileIcon imagePath={imagePath} isUser={isUser} />
      <View style={styles.numberOfStickers}>
        <Text>{numberOfStickers}</Text>
      </View>
      <Text>{rank}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={mainStyle.mainView}>
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
        data={postData}
        renderItem={PostItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("PostChallengeScreen")}
        activeOpacity={0.8}
        style={styles.writePost}
      >
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
    width: (screenWidth * 0.96) / numColumns,
    height: (screenWidth * 0.96) / numColumns,
    margin: (screenWidth * 0.04) / (numColumns * 2),
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
    top: -8,
    width: 30,
    height: 30,
  },
});
