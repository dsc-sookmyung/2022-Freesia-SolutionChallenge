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
} from "react-native";
import { theme } from "../../color";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../axiosInstance";

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
  AsyncStorage.getItem('email').then(response => setEmail(response));

  // 회원정보 수정
  const save = () => {
    let body = new FormData();
    let img: any = {
      uri: profileImage,
      type: 'image/png',
      name: 'profile.png'
    };
    body.append('profileImg', img);
    body.append('nickName', nickname);
    body.append('goalMsg', goal);

    axiosInstance.put(`/api/user?email=${email}`, body, {
      headers: { 'content-type': `multipart/form-data` },
      transformRequest: (data, headers) => {
        return body;
      },
    }).then(function (response) {
      ToastAndroid.show("Saved Successfully!", ToastAndroid.SHORT);
      navigation.dispatch(StackActions.popToTop);
    }).catch(function (error) {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text style={styles.text}>Profile Image</Text>
        <TouchableOpacity onPress={pickImage} style={styles.addImage}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Ionicons name="add" size={50} color="black" />
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Nickname</Text>
      <TextInput
        value={nickname}
        onChangeText={onChangeNickname}
        style={styles.textInput}
      />

      <Text style={styles.text}>Goal</Text>
      <TextInput
        value={goal}
        onChangeText={onChangeGoal}
        style={styles.textInput}
      />

      <TouchableOpacity onPress={() => save()}>
        <Text style={styles.saveBtn}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  },
  textInput: {
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: theme.headerBg,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 20,
    margin: 50,
    paddingVertical: 5,
  },
});
