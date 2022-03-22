import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  Divider,
  mainStyle,
  screenWidth,
  ipAddress,
} from "../../CommonComponent";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const numColumns = 3;

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
  const [rankingData, setRankingData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userNickName, setUserNickName] = useState("");
  const [userCheering, setUserCheering] = useState(0);

  const getRankingList = () => {
    axiosInstance
      .get(`/auth/cheering/ranking`)
      .then(function (response) {
        setRankingData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getPostList = () => {
    axiosInstance
      .get(`/auth/challenge/list`)
      .then(function (response) {
        setPostData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getUserInfo = async () => {
    const email = await AsyncStorage.getItem("email");
    axiosInstance
      .get(`/auth/user?email=${email}`)
      .then(function (response) {
        setUserNickName(response.data.nickName);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getUserCheeringNum = async () => {
    const email = await AsyncStorage.getItem("email");
    axiosInstance
      .get(`/auth/cheering/cnt?userEmail=${email}`)
      .then(function (response) {
        setUserCheering(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPostList();
    getRankingList();
    getUserInfo();
    getUserCheeringNum();
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

  const ItemPost = ({ item }) => {
    const challengeId = item.id;
    const authorEmail = item.uid.email;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.postView}
        onPress={() =>
          navigation.navigate("ChallengeDetailScreen", {
            challengeId,
            authorEmail,
          })
        }
      >
        <Image
          style={styles.postView}
          source={require("../../../assets/tori.jpg")}
        />
      </TouchableOpacity>
    );
  };

  const Ranking = ({ data, rank, isUser, imagePath }) => {
    const rankerCheeringInfo = Object.values(data);
    const numberOfCheering = rankerCheeringInfo[0];
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.ranking}>
        {rank == "1st" ? (
          <Image
            style={styles.crownImg}
            source={require("../../../assets/crown.png")}
          ></Image>
        ) : null}
        <ProfileIcon imagePath={imagePath} isUser={isUser} />
        <View style={styles.numberOfCheering}>
          <Text>{numberOfCheering}</Text>
        </View>
        <Text>{rank}</Text>
      </TouchableOpacity>
    );
  };

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
          data={{ Aaaa: userCheering }}
          rank={userNickName}
          imagePath={null}
          isUser={true}
        />
        {rankingData.map((r, idx) => (
          <Ranking
            data={r}
            rank={Object.keys(r)}
            key={idx}
            isUser={false}
            imagePath={require("../../../assets/tori.jpg")}
          />
        ))}
      </ScrollView>
      <Divider />
      <FlatList
        data={postData.slice().reverse()}
        renderItem={ItemPost}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PostChallengeScreen", { isCreate: true })
        }
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
  numberOfCheering: {
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
