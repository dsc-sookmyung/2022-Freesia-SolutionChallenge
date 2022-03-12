import React, { useState } from "react";
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
import { ImageBrowser } from "expo-image-picker-multiple";
import { Ionicons } from "@expo/vector-icons";
import { Divider, mainStyle, screenWidth } from "../../CommonComponent";

export default function PostChallengeScreen({ navigation }) {
  const [image, setImage] = useState(null);
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
      setImage(result.uri);
      console.log(image);
    }
  };

  const handleCheck = () => {
    const challengePostInfo = {
      image,
      title,
      contents,
    };

    console.log(challengePostInfo);

    image == null
      ? Alert.alert("Write Post", "Please select an image", [{ text: "Okay" }])
      : navigation.navigate("ChallengeScreen", { challengePostInfo });
  };

  const handleTitleChange = (payload) => setTitle(payload);
  const handleContentsChange = (payload) => setContents(payload);

  return (
    <View style={{ ...mainStyle.mainView, paddingTop: 20 }}>
      <TouchableOpacity onPress={pickImage} style={styles.addImage}>
        {image ? (
          <Image
            source={{ uri: image }}
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
