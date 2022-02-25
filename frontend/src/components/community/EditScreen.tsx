import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from "react-native-gesture-handler";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function EditScreen({ route }: any) {
  const [title, setTitle] = useState(route.params.title);
  const [content, setContent] = useState(route.params.content);
  const onChangeTitle = (e: string) => setTitle(e);
  const onChangeContent = (e: string) => setContent(e);

  return (
    <View style={styles.container}>
      {/* selector로 선택 옵션 구현? */}
      <Text>Category: worries</Text>

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
        <Ionicons name="checkmark-circle" size={60} color="black" />
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.7,
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
    top: SCREEN_HEIGHT - 180,
    right: 20,
    zIndex: 1,
  },
});