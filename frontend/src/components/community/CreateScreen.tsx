import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function CreateScreen({ route, navigation }: any) {
  const [image, setImage] = useState(null);
  const images = route.params.data;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const onChangeTitle = (e: string) => setTitle(e);
  const onChangeContent = (e: string) => setContent(e);


  return (
    <View style={styles.container}>
      <Text><Text style={{ fontWeight: "bold" }}>Category: </Text>{route.params.category}</Text>
      {images ? images.map((image: any, index: number) => {
        return (
          <Image
            style={{ height: 100, width: 100 }}
            source={{ uri: image.uri }}
            key={index}
          />
        )
      }) : null}
      <TouchableOpacity onPress={() => navigation.navigate('ImageBrowser')} style={styles.addImage}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Ionicons name="add" size={50} color="black" />
        )}
      </TouchableOpacity>
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

      <TouchableOpacity style={styles.createBtn}>
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