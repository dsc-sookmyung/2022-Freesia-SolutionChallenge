import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { theme } from "../../color";
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../axiosInstance";

export default function SettingScreen({ navigation }: any) {
  const [nickname, setNickname] = useState<string>("nickname");
  const onChangeNickname = (e: string) => setNickname(e);
  const save = () => {
    ToastAndroid.show("Saved", ToastAndroid.SHORT);
    // 서버에 전송
  };
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // 토큰 제거
      ToastAndroid.show("Logged Out Successfully!", ToastAndroid.SHORT);
      navigation.navigate('ProfileScreen');
      return true;
    }
    catch (err) {
      console.log(err);
      return false;
    }
  };
  const deleteAccount = () => {
    Alert.alert('Delete Account', 'Do you want to delete account?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          // 회원 탈퇴 함수
          Alert.alert('Good Bye :)');
        }
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <EvilIcons name="user" size={150} color="black" />
        <TextInput
          value={nickname}
          onChangeText={onChangeNickname}
          style={styles.nickname}
        />
        <Text>간호사 준비 중입니다.</Text>
        <TouchableOpacity onPress={() => save()}>
          <Text style={styles.saveBtn}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity>
          <Text style={styles.menuItem}>고객센터</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.menuItem}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteAccount}>
          <Text style={styles.menuItem}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  nickname: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginVertical: 10,
    borderBottomWidth: 2,
  },
  saveBtn: {
    fontSize: 16,
    backgroundColor: theme.devideBg,
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  menu: {
  },
  menuItem: {
    fontSize: 20,
    borderTopColor: theme.devideBg,
    borderTopWidth: 2,
    paddingVertical: 10,
  }
})
