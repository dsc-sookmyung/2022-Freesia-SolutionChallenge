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
  Alert,
} from "react-native";
import { Divider, mainStyle, screenWidth } from "../../CommonComponent";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

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
  const [token, setToken] = useState<string>("");
  AsyncStorage.getItem("token").then((response) => setToken(response));

  const [postData, setPostData] = useState([]);
  const [rankingData, setRankingData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userNickName, setUserNickName] = useState("");
  const [userProfileImg, setUserProfileImg] = useState<string>();
  const [userCheering, setUserCheering] = useState(0);
  const [re, setRe] = useState(false);

  const getRankingList = async () => {
    var rankingData: any[] = [];
    await axiosInstance
      .get(`/cheering/ranking`)
      .then(function (response) {
        rankingData = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    await Promise.all(
      rankingData.map(async (data, id) => {
        await axiosInstance
          .get(`/api/user/image?email=${data.email}`)
          .then(function (response) {
            data.profileImg = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      })
    ).then(() => setRankingData(rankingData));
  };

  const getPostList = async () => {
    var data: any[] = [];
    await axiosInstance
      .get(`/challenge/list`)
      .then(function (response) {
        data = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    await Promise.all(
      data.map(async (post, id) => {
        await axiosInstance
          .get(`/challenge/image?id=${post.filePathId}`)
          .then(function (response) {
            post.mainImg = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      })
    ).then(() => setPostData(data));
  };

  const getUserInfo = async () => {
    const email = await AsyncStorage.getItem("email");
    axiosInstance
      .get(`/api/user?email=${email}`)
      .then(function (response) {
        setUserNickName(response.data.nickName);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getUserProfileImg = async () => {
    const email = await AsyncStorage.getItem("email");
    axiosInstance
      .get(`/api/user/image?email=${email}`)
      .then(function (response) {
        setUserProfileImg(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getUserCheeringNum = async () => {
    const email = await AsyncStorage.getItem("email");
    axiosInstance
      .get(`/cheering/cnt?userEmail=${email}`)
      .then(function (response) {
        setUserCheering(response.data);
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
    wait(500).then(() => setRefreshing(false));
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    getPostList();
    getRankingList();
    getUserInfo();
    getUserProfileImg();
    getUserCheeringNum();
    return () => {
      setRe(false);
    };
  }, [isFocused]);

  // 랭킹에 출력할 프로필 아이콘
  const ProfileIcon = ({ imagePath, isUser, ranking }) => {
    return (
      <View
        style={{
          ...styles.profileIcon,
          width: isUser ? 60 : 50,
          height: isUser ? 60 : 50,
          borderRadius: isUser ? 30 : 25,
          borderWidth: isUser
            ? 3
            : ranking == 0 || ranking == 1 || ranking == 2
            ? 2
            : 0,
          borderColor: isUser
            ? "#BAF1C9"
            : ranking == 0
            ? "#FEE101"
            : ranking == 1
            ? "#D7D7D7"
            : ranking == 2
            ? "#A77044"
            : null,
        }}
      >
        <Image
          style={{ width: isUser ? 60 : 50, height: isUser ? 60 : 50 }}
          source={{ uri: imagePath }}
        />
      </View>
    );
  };

  // FlatList로 출력될 post 형식
  const ItemPost = ({ item }) => {
    const challengeId = item.id;
    const authorEmail = item.uid.email;
    const mainImg = "data:image/png;base64," + item.mainImg;

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
        <Image style={styles.postView} source={{ uri: mainImg }} />
      </TouchableOpacity>
    );
  };

  // ScrollView로 출력될 rank 형색
  const Ranking = ({ ranking, data, nickname, isUser, profileImg }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={{ ...styles.ranking }}>
        {ranking == 0 ? (
          <Image
            style={styles.crownImg}
            source={require("../../../assets/crown.png")}
          ></Image>
        ) : null}
        <ProfileIcon
          imagePath={`data:image/png;base64,${profileImg}`}
          isUser={isUser}
          ranking={ranking}
        />
        <View style={styles.numberOfCheering}>
          <Text>{data}</Text>
        </View>
        <Text>{nickname}</Text>
      </TouchableOpacity>
    );
  };

  // 로컬 스토리지의 토큰 존재여부 확인
  const checkToken = () => {
    if (!token) {
      Alert.alert("Warning", "You can use it after login.");
    } else {
      navigation.navigate("PostChallengeScreen", {
        isCreate: true,
        isNew: true,
      });
    }
  };

  return (
    <View style={mainStyle.mainView}>
      <Text style={styles.subTItle}>Top 10 of the Week</Text>
      <Divider />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.rankingScrollView}
      >
        {userNickName == "" ? null : (
          <Ranking
            ranking={-1}
            data={userCheering}
            nickname={userNickName}
            profileImg={userProfileImg}
            isUser={true}
          />
        )}
        {rankingData.map((r, idx) => (
          <Ranking
            data={r.cnt}
            ranking={idx}
            nickname={r.nickName}
            key={idx}
            isUser={false}
            profileImg={r.profileImg}
          />
        ))}
      </ScrollView>
      <Divider />
      <FlatList
        data={postData.slice().reverse()}
        renderItem={ItemPost}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity
        onPress={checkToken}
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
  rankingScrollView: { flexGrow: 0, height: 100 },
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
    paddingHorizontal: 5,
    height: 20,
    borderRadius: 10,
    elevation: 2,
  },
  crownImg: {
    position: "absolute",
    top: 5,
    width: 30,
    height: 30,
  },
  profileIcon: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    overflow: "hidden",
    elevation: 2,
  },
});
