import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  ScrollView,
  Text,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Divider, mainStyle, screenWidth } from "../../CommonComponent";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../axiosInstance";

export default function PostChallengeScreen({ route, navigation }) {
  const [isCreate, setIsCreate] = useState<Boolean>(
    route.params.isCreate == null ? null : route.params.isCreate
  );
  let images = route.params.data;
  const [challengeId, setChallengeId] = useState();
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [filePath, setFilePath] = useState([]);
  const [isNewImg, setIsNewImg] = useState(route.params.isNew);

  useEffect(() => {
    // Create이 아닌 경우 포스트 데이터 가져옴
    isCreate == false ? setTitle(route.params.postData.title) : null;
    isCreate == false ? setContents(route.params.postData.contents) : null;
    isCreate == false ? setFilePath(route.params.postImg) : null;
    isCreate == false ? setChallengeId(route.params.postData.id) : null;
    return;
  }, []);

  const createFormData = async () => {
    const email = await AsyncStorage.getItem("email");
    let body = new FormData();
    body.append("title", title);
    body.append("contents", contents);
    body.append("uid", email);
    isNewImg
      ? images.map((image: any, index: number) => {
          let files: any = {
            uri: image.uri,
            type: "image/png",
            name: `${index}.png`,
          };
          body.append("files", files);
        })
      : null;

    isCreate == false ? body.append("id", challengeId) : null;

    return body;
  };

  const postFailedAlert = () => {
    Alert.alert(
      "Post Failed",
      "Please make sure you have completed all forms",
      [{ text: "OK" }]
    );
  };

  const sendPost = async () => {
    let body = await createFormData();
    isCreate == false
      ? axiosInstance
          .put(`/api/challenge`, body, {
            headers: { "content-type": `multipart/form-data` },
            transformRequest: (data, headers) => {
              return body;
            },
          })
          .then(function (response) {
            ToastAndroid.show("Edited Successfully!", ToastAndroid.SHORT);
            navigation.navigate("ChallengeDetailScreen", { challengeId });
          })
          .catch(function (error) {
            postFailedAlert();
            console.log(error);
          })
      : axiosInstance
          .post(`/api/challenge`, body, {
            headers: { "content-type": `multipart/form-data` },
            transformRequest: (data, headers) => {
              return body;
            },
          })
          .then(function (response) {
            ToastAndroid.show("Created Successfully!", ToastAndroid.SHORT);
            navigation.navigate("ChallengeScreen");
          })
          .catch(function (error) {
            console.log(error);
          });
  };

  const handleTitleChange = (payload) => setTitle(payload);
  const handleContentsChange = (payload) => setContents(payload);

  return (
    <View style={{ ...mainStyle.mainView, paddingTop: 20 }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: screenWidth }}
      >
        {images ? (
          images.map((image: any, index: number) => {
            return (
              <Image
                key={index}
                style={{
                  height: screenWidth,
                  width: screenWidth,
                }}
                source={{ uri: image.uri }}
              />
            );
          })
        ) : isNewImg ? (
          <View style={styles.noImageView}>
            <Text>Please add some images</Text>
          </View>
        ) : (
          filePath.map((image: any, index: number) => {
            return (
              <Image
                key={index}
                style={{
                  height: screenWidth,
                  width: screenWidth,
                }}
                source={{ uri: image }}
              />
            );
          })
        )}
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
        onPress={sendPost}
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
  noImageView: {
    height: screenWidth,
    width: screenWidth,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
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
