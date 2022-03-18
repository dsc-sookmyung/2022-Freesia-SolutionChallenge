import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ToastAndroid } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axiosInstance from "../../axiosInstance";
import { StackActions } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function CreateScreen({ route, navigation }: any) {
  const [category, setCategory] = useState("worries");
  const images = route.params.data;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const onChangeTitle = (e: string) => setTitle(e);
  const onChangeContent = (e: string) => setContent(e);
  const createPost = () => {
    let body = new FormData();
    body.append('category', category);
    body.append('title', title);
    body.append('content', content);
    body.append('email', 'gdsc@gmail.com'); // test
    images.map((image: any, index: number) => {
      let files: any = {
        uri: image.uri,
        type: 'image/png',
        name: `${index}.png`
      };
      body.append('files', files);
    });

    axiosInstance.post(`/auth/community`, body, {
      headers: { 'content-type': `multipart/form-data` },
      transformRequest: (data, headers) => {
        return body;
      },
    }).then(function (response) {
      ToastAndroid.show("Created Successfully!", ToastAndroid.SHORT);
      navigation.dispatch(StackActions.popToTop);
    }).catch(function (error) {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>Category: </Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) =>
              setCategory(itemValue)
            }>
            <Picker.Item label="worries" value="worries" />
            <Picker.Item label="review" value="review" />
            <Picker.Item label="gathering" value="gathering" />
          </Picker>
        </View>
        <ScrollView horizontal>
          {images ? images.map((image: any, index: number) => {
            return (
              <View style={{ flexDirection: "column" }} key={index}>
                <Image
                  style={{ height: 100, width: 100 }}
                  source={{ uri: image.uri }}
                />
              </View>
            )
          }) : null}
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
  addImage: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2,
    backgroundColor: "lightgrey",
    marginTop: 10,
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
});