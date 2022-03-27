import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  ToastAndroid,
  Alert,
} from "react-native";
import { theme } from "../../color";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL, mainStyle } from "../../CommonComponent";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function SignupScreen({ navigation }: any) {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };
  const onChangeId = (e: string) => setId(e);
  const onChangePw = (e: string) => setPw(e);
  const onChangeEmail = (e: string) => setEmail(e);
  const onChangeNickname = (e: string) => setNickname(e);
  const onChangeUsername = (e: string) => setUsername(e);
  const onChangeGoal = (e: string) => setGoal(e);

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
    id == "" ||
    pw == "" ||
    nickname == "" ||
    goal == "" ||
    email == "" ||
    username == "" ||
    profileImage == null
      ? notCompleteAlert()
      : save();
  };

  // 회원가입
  const save = () => {
    let body = new FormData();
    body.append("email", email);
    body.append("goalMsg", goal);
    body.append("loginId", id);
    body.append("nickName", nickname);
    body.append("password", pw);
    let profileImg: any = {
      uri: profileImage,
      type: "image/png",
      name: `0.png`,
    };
    body.append("profileImg", profileImg);
    body.append("username", username);

    // 서버에 전송
    axios
      .post(`${BASE_URL}/generalJoin`, body, {
        headers: { "content-type": `multipart/form-data` },
        transformRequest: (data, headers) => {
          return body;
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .then(() => {
        navigation.navigate("Login");
        ToastAndroid.show("Sign Up Successfully!", ToastAndroid.SHORT);
      })
      .catch(function (error) {
        console.log(error);
        loginFailAlert();
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 25,
          color: "black",
          fontWeight: "700",
          marginBottom: 20,
        }}
      >
        SIGN UP
      </Text>
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
          value={id}
          placeholder="Id"
          onChangeText={onChangeId}
          style={mainStyle.textInput}
        />
        <TextInput
          value={pw}
          placeholder="Password"
          onChangeText={onChangePw}
          style={mainStyle.textInput}
          secureTextEntry={true}
        />
        <TextInput
          value={email}
          placeholder="Email"
          onChangeText={onChangeEmail}
          style={mainStyle.textInput}
        />
        <TextInput
          value={username}
          placeholder="Username"
          onChangeText={onChangeUsername}
          style={mainStyle.textInput}
        />
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
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={mainStyle.buttonContainer}
          onPress={() => checkFormComplete()}
        >
          <Text style={mainStyle.buttonTitle}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpForm: {
    justifyContent: "center",
    alignItems: "center",
  },
  addImage: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    backgroundColor: "lightgrey",
    borderRadius: SCREEN_WIDTH / 8,
    marginVertical: 10,
    overflow: "hidden",
  },
  buttonView: { width: "100%", alignItems: "center" },
});
