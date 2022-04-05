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
import {
  Divider,
  mainStyle,
  screenWidth,
  ipAddress,
} from "../../CommonComponent";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const numColumns = 3;

const ImgDataSample = [
  require("../../../assets/sample/sample1.jpg"),
  require("../../../assets/sample/sample2.jpg"),
  require("../../../assets/sample/sample3.jpg"),
  require("../../../assets/sample/sample4.jpg"),
  require("../../../assets/sample/sample5.jpg"),
  require("../../../assets/sample/sample6.jpg"),
  require("../../../assets/sample/sample7.jpg"),
  require("../../../assets/sample/sample8.jpg"),
  require("../../../assets/sample/sample9.jpg"),
  require("../../../assets/sample/sample10.jpg"),
];

const rankingDataSample = [
  {
    cheeringNum: 354,
    nickname: "miae",
    filePath: require("../../../assets/profileImg/profile1.jpg"),
  },
  {
    cheeringNum: 323,
    nickname: "hiyun",
    filePath: require("../../../assets/profileImg/profile2.jpg"),
  },
  {
    cheeringNum: 312,
    nickname: "heejin",
    filePath: require("../../../assets/profileImg/profile3.jpg"),
  },
  {
    cheeringNum: 288,
    nickname: "taeyoon",
    filePath: require("../../../assets/profileImg/profile4.jpg"),
  },
  {
    cheeringNum: 285,
    nickname: "haehon",
    filePath: require("../../../assets/profileImg/profile5.jpg"),
  },
  {
    cheeringNum: 240,
    nickname: "jin",
    filePath: require("../../../assets/profileImg/profile6.jpg"),
  },
  {
    cheeringNum: 135,
    nickname: "jihee",
    filePath: require("../../../assets/profileImg/profile7.jpg"),
  },
  {
    cheeringNum: 100,
    nickname: "minjung",
    filePath: require("../../../assets/profileImg/profile8.jpg"),
  },
  {
    cheeringNum: 80,
    nickname: "minji",
    filePath: require("../../../assets/profileImg/profile9.jpg"),
  },
  {
    cheeringNum: 60,
    nickname: "won",
    filePath: require("../../../assets/profileImg/profile10.jpg"),
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
  const [token, setToken] = useState<string>("");
  AsyncStorage.getItem("token").then((response) => setToken(response));

  const [postData, setPostData] = useState([]);
  const [rankingData, setRankingData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userNickName, setUserNickName] = useState("");
  const [userProfileImg, setUserProfileImg] = useState<string>();
  const [userCheering, setUserCheering] = useState(0);
  const [mainImg, setMainImg] = useState([]);

  const getRankingList = () => {
    axiosInstance
      .get(`/cheering/ranking`)
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
      .get(`/challenge/list`)
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
        setUserProfileImg(`data:image/png;base64,${response.data}`);
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

  const isFocused = useIsFocused();
  useEffect(() => {
    getPostList();
    getRankingList();
    getUserInfo();
    getUserProfileImg();
    getUserCheeringNum();
    return;
  }, [isFocused]);

  const ProfileIcon = ({ imagePath, isUser, ranking }) => {
    /* f (imagePath == null)
      imagePath = require("../../../assets/profile_default.jpg"); */
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: isUser ? 60 : 50,
          height: isUser ? 60 : 50,
          borderRadius: isUser ? 30 : 25,
          margin: 5,
          overflow: "hidden",
          elevation: 2,
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
          source={imagePath}
        />
      </View>
    );
  };

  /*   const getMainImg = (mainImgId) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/challenge/image?id=${mainImgId.mainImgId}`)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  };

  const MainImg = (mainImgId) => {
    getMainImg(mainImgId).then((data) => setMainImg([...mainImg, data]));
    return <Image style={styles.postView} source={{ uri: mainImg[0] }} />;
  }; */

  const ItemPost = ({ item }) => {
    const challengeId = item.id;
    const authorEmail = item.uid.email;
    const mainImgId = item.filePathId;
    const randomNum = Math.floor(Math.random() * 10);

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
        <Image style={styles.postView} source={ImgDataSample[randomNum]} />
      </TouchableOpacity>
    );
  };

  const Ranking = ({ ranking, data, nickname, isUser, imagePath }) => {
    //const rankerCheeringInfo = Object.values(data);
    //const numberOfCheering = rankerCheeringInfo[0];
    const numberOfCheering = data.cheeringNum;
    return (
      <TouchableOpacity activeOpacity={0.8} style={{ ...styles.ranking }}>
        {ranking == 0 ? (
          <Image
            style={styles.crownImg}
            source={require("../../../assets/crown.png")}
          ></Image>
        ) : null}
        <ProfileIcon imagePath={imagePath} isUser={isUser} ranking={ranking} />
        <View style={styles.numberOfCheering}>
          <Text>{numberOfCheering}</Text>
        </View>
        <Text>{nickname}</Text>
      </TouchableOpacity>
    );
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
            data={{ cheeringNum: userCheering }}
            nickname={userNickName}
            imagePath={{ uri: userProfileImg }}
            isUser={true}
          />
        )}
        {rankingDataSample.map((r, idx) => (
          <Ranking
            data={r}
            ranking={idx}
            nickname={r.nickname}
            key={idx}
            isUser={false}
            imagePath={r.filePath}
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
        onPress={() => {
          if (!token) {
            Alert.alert("Warning", "You can use it after login.");
          } else {
            navigation.navigate("PostChallengeScreen", {
              isCreate: true,
              isNew: true,
            });
          }
        }}
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
});

/* {.map((r, idx) => (
  <Ranking
    data={r}
    ranking={idx}
    nickname={Object.keys(r)}
    key={idx}
    isUser={false}
    imagePath={require("../../../assets/tori.jpg")}
  />
))} */
