import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import MyChallengeList from "./MyChallengeList";
import MyCommunityList from "./MyCommunityList";
import MyBookmarkList from "./MyBookmarkList";
import { theme } from "../../color";

export default function ProfileScreen({ navigation }: any) {

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
            <EvilIcons name="user" size={70} color="black" />
            <Text style={styles.nickname}>nickname</Text>
          </View>
          <TouchableOpacity onPress={gotoSetting}>
            <Ionicons name="settings-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.goalArea}>
          <Text>간호사 준비 중입니다.</Text>
          <Text style={styles.dday}>
            <Text style={{ color: "#FF4588" }}>+39</Text> days
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