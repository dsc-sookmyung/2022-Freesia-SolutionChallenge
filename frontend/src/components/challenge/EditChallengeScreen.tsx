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
import { StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Divider, mainStyle, screenWidth } from "../../CommonComponent";

export default function EditChallengeScreen({ navigation, route }) {
  let postData = route.params.postData;
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(postData.title);
  const [contents, setContents] = useState(postData.contents);

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
    postData.title = title;
    postData.contents = contents;

    image == null
      ? Alert.alert("Write Post", "Please select an image", [{ text: "Okay" }])
      : StackActions.pop();
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
