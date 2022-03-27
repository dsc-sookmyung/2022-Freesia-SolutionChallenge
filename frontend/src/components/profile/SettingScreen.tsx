import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, Modal, RefreshControl, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { theme } from "../../color";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../axiosInstance";
import * as ImagePicker from "expo-image-picker";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function SettingScreen({ route, navigation }: any) {

  // 새로고침
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axiosInstance.get(`/api/user?email=${email}`)
      .then(function (response) {
        setLoginId(response.data.loginId);
      }).catch(function (error) {
        console.log(error);
      });
    axiosInstance.get(`/api/user/image?email=${email}`)
      .then(function (response) {
        setProfileImg(`data:image/png;base64,${response.data}`);
        setRefreshing(false);
      }).catch(function (error) {
        console.log(error);
      });
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [profileImg, setProfileImg] = useState<string>();
  const [nickname, setNickname] = useState<string>(route.params.nickname);
  const [goalMsg, setGoalMsg] = useState<string>(route.params.goalMsg);
  const [loginId, setLoginId] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();

  // localStorage에 저장된 이메일 불러오기
  const [email, setEmail] = useState<string>(route.params.email);

  // 사용자 정보 조회
  const getUser = () => {
    axiosInstance.get(`/api/user?email=${email}`)
      .then(function (response) {
        setLoginId(response.data.loginId);
      }).catch(function (error) {
        console.log(error);
      });
  };
  const getProfileImg = () => {
    axiosInstance.get(`/api/user/image?email=${email}`)
      .then(function (response) {
        setProfileImg(`data:image/png;base64,${response.data}`);
      }).catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getUser();
    getProfileImg();
  }, []);

  const onChangeNickname = (e: string) => setNickname(e);
  const onChangeGoalMsg = (e: string) => setGoalMsg(e);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImg(result.uri);
    }
  };

  // 회원정보 수정
  const save = () => {
    let body = new FormData();
    let img: any = {
      uri: profileImg,
      type: 'image/png',
      name: 'profile.png'
    };
    body.append('profileImg', img);
    body.append('nickName', nickname);
    body.append('goalMsg', goalMsg);

    axiosInstance.put(`/api/user?email=${email}`, body, {
      headers: { 'content-type': `multipart/form-data` },
      transformRequest: (data, headers) => {
        return body;
      },
    }).then(function (response) {
      ToastAndroid.show("Saved", ToastAndroid.SHORT);
      navigation.navigate('ProfileScreen');
    }).catch(function (error) {
      console.log(error);
    });
  };

  // 비밀번호 변경
  const onChangeNewPassword = (e: string) => setNewPassword(e);
  const changePassword = () => {
    axiosInstance.put(`/api/user/pw?email=${email}`, {
      password: newPassword
    }).then(function (response) {
      ToastAndroid.show("Saved", ToastAndroid.SHORT);
      setModalVisible(false);
    }).catch(function (error) {
      console.log(error);
    });
  };

  // 고객센터
  const gotoCustomerService = () => {
    navigation.navigate('CustomerService');
  };

  // 로그아웃
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // 토큰 제거
      await AsyncStorage.removeItem('email'); // 이메일 제거
      ToastAndroid.show("Logged Out Successfully!", ToastAndroid.SHORT);
      navigation.navigate('ProfileScreen');
      return true;
    }
    catch (err) {
      console.log(err);
      return false;
    }
  };

  // 회원탈퇴
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
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ alignSelf: "flex-end" }}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text>Enter new password</Text>
            <TextInput value={newPassword} onChangeText={onChangeNewPassword} style={{ ...styles.goalMsg, width: SCREEN_WIDTH * 0.4, textAlign: "center" }} secureTextEntry={true} />
            <TouchableOpacity onPress={changePassword}>
              <Text style={styles.saveBtn}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.userInfo}>
        <TouchableOpacity onPress={pickImage} style={styles.addImage}>
          {profileImg ? (
            <Image
              source={{ uri: profileImg }}
              style={{ width: "100%", height: "100%", borderRadius: 150, overflow: 'hidden' }}
            />
          ) : (
            <Ionicons name="add" size={50} color="black" />
          )}
        </TouchableOpacity>
        <TextInput
          value={nickname}
          onChangeText={onChangeNickname}
          style={styles.nickname}
        />
        <TextInput
          value={goalMsg}
          onChangeText={onChangeGoalMsg}
          style={styles.goalMsg}
        />
        {loginId ?
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.pwd}>Change Password</Text>
          </TouchableOpacity>
          : null
        }

        <TouchableOpacity onPress={() => save()}>
          <Text style={styles.saveBtn}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity onPress={gotoCustomerService}>
          <Text style={styles.menuItem}>Customer Service</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.menuItem}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteAccount}>
          <Text style={styles.menuItem}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  addImage: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH / 4,
    height: SCREEN_WIDTH / 4,
    backgroundColor: "lightgrey",
    borderRadius: SCREEN_WIDTH / 8,
  },
  nickname: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginVertical: 10,
    borderBottomWidth: 2,
  },
  goalMsg: {
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  pwd: {
    color: "grey",
    textDecorationLine: "underline",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
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
