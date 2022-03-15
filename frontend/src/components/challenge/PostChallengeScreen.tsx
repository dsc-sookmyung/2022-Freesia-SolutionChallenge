import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import {
  Divider,
  mainStyle,
  screenWidth,
  ipAddress,
} from "../../CommonComponent";

import axiosInstance from "../../axiosInstance";
//import FormData from "form-data";
//import "url-search-params-polyfill";

export default function PostChallengeScreen({ navigation }) {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setFiles([...files, result.uri]);
    }
    console.log(files);
  };

  const handleCheck = () => {
    postChallengeData();

    /* files == null
      ? Alert.alert("Write Post", "Please select an image", [{ text: "Okay" }])
      : navigation.navigate("ChallengeScreen"); */
  };

  const postChallengeData = async () => {
    /* const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(`http://${ipAddress}:8080/api/challenge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          files,
          title,
          contents,
          uid: "1",
        }),
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    } */

    /*  axiosInstance
      .get(`/api/centers`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("------------------------");
        console.log(error);
      }); */

    let data = {
      title,
      contents,
      files: null,
      uid: "1111",
    };

    let body = new FormData();
    //body.append("data", JSON.stringify(data));
    // 현재 사용자가 불러온 이미지 리스트들 => 각각 폼데이터에 넣어준다.
    files.map((f, index) => {
      let file = {
        uri: f,
        type: "multipart/form-data",
        name: `${index}.jpg`,
      };
      body.append("files", file);
    });

    body.append("title", title);
    body.append("contents", contents);
    body.append("uid", "1111");

    /* let params = new URLSearchParams();
    params.set("title", title);
    params.set("contents", contents);
    params.set("uid", "1111");
    console.log(params); */

    console.log(body);
    axiosInstance
      .post(`/api/challenge`, {
        Accept: "application/json",
        body,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleTitleChange = (payload) => setTitle(payload);
  const handleContentsChange = (payload) => setContents(payload);

  return (
    <View style={{ ...mainStyle.mainView, paddingTop: 20 }}>
      <TouchableOpacity onPress={pickImage} style={styles.addImage}>
        {files ? (
          <Image
            source={{ uri: files[0] }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Ionicons name="add" size={50} color="black" />
        )}
      </TouchableOpacity>
      <View style={styles.titleInputView}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={handleTitleChange}
          style={styles.inputTitle}
        />
      </View>
      <Divider />
      <View>
        <TextInput
          multiline
          placeholder="Contents"
          value={contents}
          onChangeText={handleContentsChange}
        />
      </View>

      <TouchableOpacity
        onPress={handleCheck}
        activeOpacity={0.8}
        style={styles.writePost}
      >
        <Ionicons
          style={styles.writePostIcon}
          name="checkmark-circle"
          size={65}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addImage: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth / 2,
    height: screenWidth / 2,
    backgroundColor: "lightgrey",
  },
  writePost: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  writePostIcon: {
    color: "#ffd25E",
  },
  titleInputView: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
  },
  inputTitle: {
    fontWeight: "700",
    marginRight: 15,
  },
});
