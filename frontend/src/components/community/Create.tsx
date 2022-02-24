import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from "react-native-gesture-handler";
import { theme } from "../../color";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
    padding: 20,
    marginBottom: 170,
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
    top: 545,
    right: 20,
    zIndex: 1,
  },
});