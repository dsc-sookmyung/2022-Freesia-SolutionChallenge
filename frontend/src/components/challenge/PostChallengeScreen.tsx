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
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "../../CommonComponent";

const screenPadding = 20;
const screenWidth = Dimensions.get("window").width - screenPadding * 2;

export default function PostChallengeScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [contents, setContents] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
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
      : navigation.navigate("ChallengeScreen");
  };

  const handleTitleChange = (payload) => setTitle(payload);
  const handleContentsChange = (payload) => setContents(payload);

  return (
    <View style={styles.mainView}>
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
        <Text style={styles.inputTitle}>Title</Text>
        <TextInput value={title} onChangeText={handleTitleChange} />
      </View>
      <Divider />
      <View>
        <Text style={{ ...styles.inputTitle, marginBottom: 10 }}>Contents</Text>
        <TextInput
          multiline
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
  mainView: {
    position: "relative",
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: screenPadding,
    paddingTop: screenPadding,
  },
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
