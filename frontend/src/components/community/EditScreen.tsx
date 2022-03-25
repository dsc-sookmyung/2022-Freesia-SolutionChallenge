import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, ToastAndroid } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axiosInstance from "../../axiosInstance";
import { StackActions } from "@react-navigation/native";
import base64 from 'react-native-base64'

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function EditScreen({ navigation, route }: any) {

  const [title, setTitle] = useState<string>(route.params.title);
  const [content, setContent] = useState<string>(route.params.content);
  const onChangeTitle = (e: string) => setTitle(e);
  const onChangeContent = (e: string) => setContent(e);
  const editPost = () => {
    let body = new FormData();
    body.append('title', title);
    body.append('content', content);
    body.append('id', route.params.id);

    axiosInstance.put(`/api/community`, body, {
      headers: { 'content-type': 'multipart/form-data' },
      transformRequest: (data, headers) => {
        return body;
      },
    }).then(function (response) {
      ToastAndroid.show("Edited Successfully!", ToastAndroid.SHORT);
      navigation.dispatch(StackActions.popToTop);
    }).catch(function (error) {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text><Text style={{ fontWeight: "bold" }}>Category: </Text>{route.params.category}</Text>
        <ScrollView horizontal>
          {route.params.images ? route.params.images.map((image: any, index: number) => {
            return (
              <View style={{ flexDirection: "column" }} key={index}>
                <Image
                  style={{ height: 100, width: 100 }}
                  source={{ uri: image }}
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

      <TouchableOpacity onPress={editPost} style={styles.createBtn}>
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