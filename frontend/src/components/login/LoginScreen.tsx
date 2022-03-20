import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ToastAndroid, TextInput } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from '@react-navigation/native';
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { theme } from "../../color";

const BASE_URL = "http://192.168.0.9:8080"; // localhost 대신 본인 컴퓨터 ip(IPv4) 주소
WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }: any) {

  // 일반 로그인
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const onChangeId = (e: string) => setId(e);
  const onChangePw = (e: string) => setPw(e);
  const login = () => {
    // 서버에 전송
    ToastAndroid.show("Saved Successfully!", ToastAndroid.SHORT);
    navigation.dispatch(StackActions.popToTop);
  };

  // 구글 로그인
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '47936525334-hf646aag67peinnmtnad57j8tu1dnt88.apps.googleusercontent.com',
    androidClientId: '47936525334-nbb6as274m9vd73h4ejlaiddoe160jtj.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      // 서버에 전송
      axios.post(`${BASE_URL}/api/google`, {
        accessToken: authentication.accessToken
      }).then(function (response) {
        AsyncStorage.setItem('token', response.data.token); // 로컬에 토큰 저장
        AsyncStorage.setItem('email', response.data.email); // 로컬에 이메일 저장
        ToastAndroid.show("Logged In Successfully!", ToastAndroid.SHORT);
      }).catch(function (error) {
        console.log(error);
      });
      navigation.dispatch(StackActions.popToTop());
    }
  }, [response]);

  return (
    <View style={styles.login}>
      <Text style={styles.loginTitle}>Login</Text>
      <View style={styles.inputArea}>
        <Text style={styles.text}>ID</Text>
        <TextInput value={id} onChangeText={onChangeId} style={styles.textInput} />
      </View>
      <View style={styles.inputArea}>
        <Text style={styles.text}>Password</Text>
        <TextInput value={pw} onChangeText={onChangePw} style={styles.textInput} secureTextEntry={true} />
      </View>
      <TouchableOpacity onPress={() => login()}>
        <View style={{ ...styles.socialLogin, backgroundColor: theme.headerBg, marginVertical: 20 }}>
          <Text style={{ ...styles.socialLoginTitle, color: "black" }}>Login</Text>
        </View>
      </TouchableOpacity>
      <Text>If you don't have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={{ textDecorationLine: "underline" }}>Sign Up</Text>
      </TouchableOpacity>

      <View style={{ width: "100%", height: 1, marginVertical: 20, backgroundColor: "#eeeeee" }} />

      <Text style={styles.loginTitle}>Social Login</Text>
      <TouchableOpacity>
        <View style={{ ...styles.socialLogin, backgroundColor: "#FFE500" }}>
          <Text style={{ ...styles.socialLoginTitle, color: "#684848" }}>
            KaKao Login
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => promptAsync()}>
        <View style={{ ...styles.socialLogin, backgroundColor: "#309CFF" }}>
          <Text style={styles.socialLoginTitle}>Google Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={{ ...styles.socialLogin, backgroundColor: "#03CF5D" }}>
          <Text style={styles.socialLoginTitle}>Naver Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  loginTitle: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 20,
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
    marginBottom: 10,
  },
  text: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    marginRight: 10,
  },
  textInput: {
    flex: 2,
    borderBottomWidth: 2,
  },
  socialLogin: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 40,
    borderRadius: 20,
    marginVertical: 4,
  },
  socialLoginTitle: {
    color: "white",
    fontSize: 18,
  },
});
