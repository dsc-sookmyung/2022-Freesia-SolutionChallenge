import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  ScrollView,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Divider, mainStyle, screenWidth } from "../../CommonComponent";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../axiosInstance";

export default function PostChallengeScreen({ route, navigation }) {
  //const [images, setImages] = useState([]);
  const images = route.params.data;
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  /* const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
    console.log(images);
  }; */

  const createPost = async () => {
    const email = await AsyncStorage.getItem("email");
    let body = new FormData();
    body.append("title", title);
    body.append("contents", contents);
    body.append("uid", email);
    images.map((image: any, index: number) => {
      let files: any = {
        uri: image.uri,
        type: "image/png",
        name: `${index}.png`,
      };
      body.append("files", files);
    });

    console.log(body);

    axiosInstance
      .post(`/auth/challenge`, body, {
        headers: { "content-type": `multipart/form-data` },
        transformRequest: (data, headers) => {
          return body;
        },
      })
      .then(function (response) {
        ToastAndroid.show("Created Successfully!", ToastAndroid.SHORT);
        navigation.dispatch(StackActions.popToTop);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /* let params = new URLSearchParams();
    params.set("title", title);
    params.set("contents", contents);
    params.set("uid", "1111");
    console.log(params); */

  /* axiosInstance
      .post(`/api/challenge`, {
        Accept: "application/json",
        body,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      }); */

  const handleTitleChange = (payload) => setTitle(payload);
  const handleContentsChange = (payload) => setContents(payload);

  return (
    <View style={{ ...mainStyle.mainView, paddingTop: 20 }}>
      <ScrollView horizontal>
        {images
          ? images.map((image: any, index: number) => {
              return (
                <View style={{ flexDirection: "column" }} key={index}>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={{ uri: image.uri }}
                  />
                </View>
              );
            })
          : null}
      </ScrollView>
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
        onPress={createPost}
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

{
  /* <TouchableOpacity onPress={pickImage} style={styles.addImage}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Ionicons name="add" size={50} color="black" />
        )}
      </TouchableOpacity> */
}
