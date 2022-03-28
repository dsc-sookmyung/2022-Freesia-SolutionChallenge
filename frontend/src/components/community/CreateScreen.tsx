import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ToastAndroid, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../axiosInstance";
import { StackActions } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { screenWidth } from "../../CommonComponent";


export default function CreateScreen({ route, navigation }: any) {
  const [email, setEmail] = useState<string>("");
  AsyncStorage.getItem("email").then((response) => setEmail(response));
  const [category, setCategory] = useState("worries");
  const images = route.params.data;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const onChangeTitle = (e: string) => setTitle(e);
  const onChangeContent = (e: string) => setContent(e);
  const createPost = () => {
    if (title == "" || content == "" || images == null) {
      Alert.alert("Write Post", "Please enter all the values.", [
        { text: "Okay" },
      ]);
    } else {
      let body = new FormData();
      body.append("category", category);
      body.append("title", title);
      body.append("content", content);
      body.append("email", email);
      images.map((image: any, index: number) => {
        let files: any = {
          uri: image.uri,
          type: "image/png",
          name: `${index}.png`,
        };
        body.append("files", files);
      });

      axiosInstance
        .post(`/api/community`, body, {
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
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>Category: </Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
          >
            <Picker.Item label="worries" value="worries" />
            <Picker.Item label="review" value="review" />
            <Picker.Item label="gathering" value="gathering" />
          </Picker>
        </View>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={{ maxHeight: screenWidth }}>
          {images ? (
            images.map((image: any, index: number) => {
              return (
                <Image key={index} source={{ uri: image.uri }} style={{ height: screenWidth, width: screenWidth }} />
              );
            })
          ) : (
            <View style={styles.noImageView}>
              <Text>Please add some images</Text>
            </View>
          )}
        </ScrollView>

        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={onChangeTitle}
          style={styles.titleInput}
        />
        <TextInput
          multiline={true}
          placeholder="Contents"
          value={content}
          onChangeText={onChangeContent}
          style={styles.contentInput}
        />
      </ScrollView>

      <TouchableOpacity onPress={createPost} style={styles.createBtn}>
        <Ionicons name="checkmark-circle" size={65} color="#ffd25E" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleInput: {
    marginVertical: 10,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#DEDEDE",
  },
  contentInput: {
    marginVertical: 10,
    fontSize: 16,
  },
  createBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  noImageView: {
    height: screenWidth,
    width: screenWidth,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
  },
});
