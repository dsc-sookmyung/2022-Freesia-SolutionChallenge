import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { theme } from "../../color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../axiosInstance";
import { useIsFocused } from "@react-navigation/native";
import { screenWidth, ProfileIcon } from "../../CommonComponent";

const numColumns = 3;

const PostItem = ({ item }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.postView}>
      <Image source={require("../../../assets/sample/sample2.jpg")} style={styles.image} />
    </TouchableOpacity>
  );
};

export default function ProfileScreen({ navigation }: any) {
  const [profileImg, setProfileImg] = useState<string>();
  const [nickname, setNickname] = useState<string>();
  const [goalMsg, setGoalMsg] = useState<string>();
  const [days, setDays] = useState<number>();

  // localStorage에 저장된 이메일, 토큰 불러오기
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  AsyncStorage.getItem("token").then((response) => setToken(response));
  AsyncStorage.getItem("email").then((response) => setEmail(response));

  // 사용자 정보 조회
  const isFocused = useIsFocused();
  const getUser = () => {
    axiosInstance
      .get(`/api/user?email=${email}`)
      .then(function (response) {
        setNickname(response.data.nickName);
        setGoalMsg(response.data.goalMsg);
        setDays(response.data.days);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getProfileImg = () => {
    axiosInstance
      .get(`/api/user/image?email=${email}`)
      .then(function (response) {
        setProfileImg(`data:image/png;base64,${response.data}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getUser();
    getProfileImg();
  }, [isFocused]);

  // 토큰이 없으면 로그인 알림 출력
  if (!token) {
    Alert.alert("Warning", "You can use it after login.", [
      {
        onPress: () => {
          navigation.navigate("Login");
        },
      },
    ]);
  }

  const gotoSetting = () => {
    navigation.navigate("SettingScreen", {
      email: email,
      nickname: nickname,
      goalMsg: goalMsg,
    });
  };

  const tabList = ["challenge", "community", "bookmark"];
  const [activeTab, setActiveTab] = useState(0);
  const changeTab = (tabIndex: number) => setActiveTab(tabIndex);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/api/mypage/${tabList[activeTab]}?email=${email}`)
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [activeTab]);

  const TabContent = () => {
    switch (tabList[activeTab]) {
      case "challenge":
        return (
          <View style={styles.innerContainer}>
            <FlatList
              data={posts}
              renderItem={PostItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              numColumns={numColumns}
            />
          </View>
        );
        break;
      case "community":
        return (
          <ScrollView style={styles.innerContainer}>
            {posts
              .slice(0)
              .reverse()
              .map((post, index) => (
                <View key={index}>
                  <TouchableOpacity style={styles.list}>
                    <View>
                      <Text style={styles.category}>{post.category}</Text>
                    </View>
                    <View style={styles.contentArea}>
                      <Text style={styles.title}>{post.title}</Text>
                      <Text numberOfLines={2}>{post.content}</Text>
                    </View>
                    <View>
                      <Text style={styles.date}>{post.createdDate}</Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: "100%",
                      height: 2,
                      backgroundColor: theme.devideBg,
                    }}
                  ></View>
                </View>
              ))}
          </ScrollView>
        );
        break;
      case "bookmark":
        return (
          <ScrollView style={styles.innerContainer}>
            {posts
              .slice(0)
              .reverse()
              .map((post, index) => (
                <View key={index}>
                  <TouchableOpacity style={styles.list}>
                    <View>
                      <Text style={styles.category}>{post.pcategory}</Text>
                    </View>
                    <View style={styles.contentArea}>
                      <Text style={styles.title}>{post.ptitle}</Text>
                      <Text numberOfLines={2}>{post.pcontent}</Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: "100%",
                      height: 2,
                      backgroundColor: theme.devideBg,
                    }}
                  ></View>
                </View>
              ))}
          </ScrollView>
        );
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.profileArea}>
          <View style={styles.nicknameArea}>
            {profileImg ? (
              <Image
                source={{ uri: profileImg }}
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
            ) : (
              <ProfileIcon imagePath={null} size={60} />
            )}
            <Text style={styles.nickname}>
              {nickname == null ? "내용을 입력하세요" : nickname}
            </Text>
          </View>
          <TouchableOpacity onPress={gotoSetting}>
            <Ionicons name="settings-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.goalArea}>
          <Text>{goalMsg == null ? "내용을 입력하세요" : goalMsg}</Text>
          <Text style={styles.dday}>
            <Text style={{ color: "#FF4588" }}>+{days}</Text> days
          </Text>
        </View>
      </View>

      <View style={styles.myList}>
        <View style={styles.tab}>
          {tabList.map((tab, index) => (
            <TouchableOpacity
              style={{ width: "30%" }}
              key={index}
              onPress={() => changeTab(index)}
              activeOpacity={1}
            >
              <Text
                style={{
                  ...styles.tabName,
                  color: activeTab === index ? "black" : theme.grey,
                  borderBottomWidth: activeTab === index ? 2 : null,
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TabContent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  userInfo: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileArea: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nicknameArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  nickname: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  goalArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dday: {
    fontWeight: "bold",
  },
  myList: {
    flex: 3,
  },
  tab: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    borderTopColor: theme.devideBg,
    borderTopWidth: 2,
    borderBottomColor: theme.devideBg,
    borderBottomWidth: 2,
  },
  tabName: {
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 8,
  },
  innerContainer: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
  category: {
    fontSize: 12,
    color: theme.grey,
  },
  contentArea: {
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    color: "grey",
  },
  postView: {
    backgroundColor: "#eeeeee",
    width: screenWidth / numColumns,
    height: screenWidth / numColumns,
    margin: (screenWidth * 0.04) / (numColumns * 2),
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
