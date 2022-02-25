import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const screenPadding = 20;
const screenWidth = Dimensions.get("window").width - screenPadding * 2;

export default function PostChallengeScreen() {
  const [image, setImage] = useState(null);

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
      console.log("cancelled");
    }
  };

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
});
