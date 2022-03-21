import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import MyChallengeList from "./MyChallengeList";
import MyCommunityList from "./MyCommunityList";
import MyBookmarkList from "./MyBookmarkList";
import { theme } from "../../color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../axiosInstance";
import { CommonActions, useIsFocused } from "@react-navigation/native";

export default function ProfileScreen({ navigation }: any) {

  const [profileImg, setProfileImg] = useState<string>();
  const [nickname, setNickname] = useState<string>();
  const [goalMsg, setGoalMsg] = useState<string>();
  const [days, setDays] = useState<number>();

  // localStorage에 저장된 이메일, 토큰 불러오기
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  AsyncStorage.getItem('token').then(response => setToken(response));
  AsyncStorage.getItem('email').then(response => setEmail(response));

  // 사용자 정보 조회
  const isFocused = useIsFocused();
  useEffect(() => {
    axiosInstance.get(`/auth/user?email=${email}`)
      .then(function (response) {
        setProfileImg(response.data.profileImg);
        setNickname(response.data.nickName);
        setGoalMsg(response.data.goalMsg);
        setDays(response.data.days);
      }).catch(function (error) {
        console.log(error);
      });
  }, [isFocused]);

  // 토큰이 없으면 로그인 알림 출력
  if (!token) {
    Alert.alert('Warning', 'You can use it after login.', [
      {
        onPress: () => {
          navigation.navigate('Login');
        }
      },
    ]);
  };

  const gotoSetting = () => {
    navigation.navigate('SettingScreen');
  };

  const tabList = [
    { name: "challenge", content: <MyChallengeList /> },
    { name: "community", content: <MyCommunityList /> },
    { name: "bookmark", content: <MyBookmarkList /> },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const changeTab = (tabIndex: number) => setActiveTab(tabIndex);

  return (
    <View style={styles.container}>

      <View style={styles.userInfo}>
        <View style={styles.profileArea}>
          <View style={styles.nicknameArea}>
            {profileImg ?
              <Image source={{ uri: profileImg }} style={{ width: 60, height: 60, borderRadius: 30 }} />
              : <EvilIcons name="user" size={70} color="black" />
            }
            <Text style={styles.nickname}>{nickname == null ? "내용을 입력하세요" : nickname}</Text>
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
            <TouchableOpacity key={index} onPress={() => changeTab(index)} activeOpacity={1}>
              <Text style={{ ...styles.tabName, color: activeTab === index ? "black" : theme.grey, borderBottomWidth: activeTab === index ? 2 : null }}>{tab.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {tabList[activeTab].content}
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
    paddingHorizontal: 10,
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
    marginLeft: 10,
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
    fontSize: 16,
    paddingVertical: 7,
  },
})