import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { theme } from "../color";
import { mainStyle } from "../CommonComponent";

export default function SignIn() {

  const [nickname, setNickname] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const onChangeNickname = (e: string) => setNickname(e);
  const onChangeGoal = (e: string) => setGoal(e);
  const save = () => {
    Alert.alert('Saved Successfully!');
    // 서버에 전송
  };
  return (
    <View style={mainStyle.mainView}>
      <Text style={styles.text}>닉네임을 설정해주세요.</Text>
      <TextInput
        value={nickname}
        onChangeText={onChangeNickname}
        style={styles.textInput}
      />

      <Text style={styles.text}>목표를 입력해주세요.</Text>
      <TextInput
        value={goal}
        onChangeText={onChangeGoal}
        style={styles.textInput}
      />

      <TouchableOpacity onPress={() => save()}>
        <Text style={styles.saveBtn}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  textInput: {
    borderBottomWidth: 2,
  },
  saveBtn: {
    backgroundColor: theme.headerBg,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 20,
    margin: 50,
    paddingVertical: 5,
  }
});
