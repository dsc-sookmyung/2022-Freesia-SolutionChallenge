import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  Image,
  ToastAndroid,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../axiosInstance";
import { mainStyle } from "../../CommonComponent";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function SocialSignupScreen({ navigation }: any) {
  const [profileImage, setProfileImage] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };
  const onChangeNickname = (e: string) => setNickname(e);
  const onChangeGoal = (e: string) => setGoal(e);

  // localStorage에 저장된 이메일 불러오기
  const [email, setEmail] = useState<string>("");
  AsyncStorage.getItem("email").then((response) => setEmail(response));

  // form 작성 미완료 시 알림
  const notCompleteAlert = () => {
    Alert.alert("Some Informations are Missing", "Please check your form", [
      { text: "OK" },
    ]);
  };

  // 로그인 실패 시 알림
  const loginFailAlert = () => {
    Alert.alert("Sign Up Failed", "Please Try Again", [{ text: "OK" }]);
  };

  // form 모두 작성했는지 확인
  const checkFormComplete = () => {
    nickname == "" || goal == "" || profileImage == null
      ? notCompleteAlert()
      : save();
  };

  // 회원정보 수정
  const save = () => {
    let body = new FormData();
    let img: any = {
      uri: profileImage,
      type: "image/png",
      name: "profile.png",
    };
    body.append("profileImg", img);
    body.append("nickName", nickname);
    body.append("goalMsg", goal);

    axiosInstance
      .put(`/api/user?email=${email}`, body, {
        headers: { "content-type": `multipart/form-data` },
        transformRequest: (data, headers) => {
          return body;
        },
      })
      .then(function (response) {
        ToastAndroid.show("Saved Successfully!", ToastAndroid.SHORT);
        navigation.dispatch(StackActions.popToTop);
      })
      .catch(function (error) {
        console.log(error);
        loginFailAlert();
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>SIGN UP</Text>
      <TouchableOpacity onPress={pickImage} style={styles.addImage}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Ionicons name="person" size={80} color="white" />
        )}
      </TouchableOpacity>

      <View style={styles.signUpForm}>
        <TextInput
          value={nickname}
          placeholder="Nickname"
          onChangeText={onChangeNickname}
          style={mainStyle.textInput}
        />
        <TextInput
          value={goal}
          placeholder="Goal"
          onChangeText={onChangeGoal}
          style={mainStyle.textInput}
        />
      </View>

      <TouchableOpacity
        style={mainStyle.buttonContainer}
        onPress={() => checkFormComplete()}
      >
        <Text style={mainStyle.buttonTitle}>SIGN UP</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "black",
    fontWeight: "700",
    marginBottom: 20,
  },
  signUpForm: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  addImage: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    backgroundColor: "lightgrey",
    borderRadius: 60,
    marginVertical: 10,
    overflow: "hidden",
  },
});
