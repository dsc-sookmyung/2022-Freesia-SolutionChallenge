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
import { theme } from "../../color";
import * as ImagePicker from "expo-image-picker";
import { StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import axiosInstance from "../../axiosInstance";
import { ipAddress } from "../../CommonComponent";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function SignupScreen({ navigation }: any) {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [profileImage, setProfileImage] = useState();
  const [nickname, setNickname] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
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
  const onChangeId = (e: string) => setId(e);
  const onChangePw = (e: string) => setPw(e);
  const onChangeEmail = (e: string) => setEmail(e);
  const onChangeNickname = (e: string) => setNickname(e);
  const onChangeUsername = (e: string) => setUsername(e);
  const onChangeGoal = (e: string) => setGoal(e);
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

    console.log(body);
    // 서버에 전송
    axios
      .post(`http://${ipAddress}:8080/api/generalJoin`, body, {
        headers: { "content-type": `multipart/form-data` },
        transformRequest: (data, headers) => {
          return body;
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // access token으로 서버에서 유저 정보 받아옴
    // nickname == null 이면 회원가입 창으로 이동
    navigation.navigate("Login");
    ToastAndroid.show("Saved Successfully!", ToastAndroid.SHORT);
    //navigation.dispatch(StackActions.popToTop);
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity onPress={pickImage} style={styles.addImage}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Ionicons name="person" size={SCREEN_WIDTH / 5} color="white" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.signUpForm}>
        <View style={styles.inputForm}>
          <Text style={styles.text}>ID</Text>
          <TextInput
            value={id}
            onChangeText={onChangeId}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            value={pw}
            onChangeText={onChangePw}
            style={styles.textInput}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            value={email}
            onChangeText={onChangeEmail}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.text}>Username</Text>
          <TextInput
            value={username}
            onChangeText={onChangeUsername}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.text}>Nickname</Text>
          <TextInput
            value={nickname}
            onChangeText={onChangeNickname}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.text}>Goal</Text>
          <TextInput
            value={goal}
            onChangeText={onChangeGoal}
            style={styles.textInput}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.btnContainer} onPress={() => save()}>
        <Text style={styles.saveBtn}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  signUpForm: {
    width: "85%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  text: {
    fontSize: 20,
  },
  addImage: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH / 4,
    height: SCREEN_WIDTH / 4,
    backgroundColor: "lightgrey",
    borderRadius: SCREEN_WIDTH / 8,
    marginVertical: "10%",
    overflow: "hidden",
  },
  inputForm: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    width: "70%",
    elevation: 2,
    borderRadius: 50,
    backgroundColor: "white",
    margin: 15,
  },
  btnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtn: {
    width: "20%",
    backgroundColor: theme.headerBg,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 20,
    margin: 50,
    paddingVertical: 5,
  },
});
