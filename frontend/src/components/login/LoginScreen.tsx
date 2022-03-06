import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ToastAndroid } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from '@react-navigation/native';
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const BASE_URL = "http://192.168.0.9:8080"; // localhost 대신 본인 컴퓨터 ip(IPv4) 주소
WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }: any) {

  // 구글 로그인
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '47936525334-hf646aag67peinnmtnad57j8tu1dnt88.apps.googleusercontent.com',
    androidClientId: '47936525334-nbb6as274m9vd73h4ejlaiddoe160jtj.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      // 서버에 전송
      axiosInstance.post(`/auth/google`, {
        accessToken: authentication.accessToken
      }).then(function (response) {
        AsyncStorage.setItem('token', response.data.token); // 로컬에 토큰 저장
        ToastAndroid.show("Logged In Successfully!", ToastAndroid.SHORT);
      }).catch(function (error) {
        console.log(error);
      });
      // access token으로 서버에서 유저 정보 받아옴
      // nickname == null 이면 회원가입 창으로 이동
      navigation.navigate('SignIn');
      // nickname != null 이면 stack의 첫 화면으로 이동
      // navigation.dispatch(StackActions.popToTop);
    }
  }, [response]);

  return (
    <View style={styles.login}>
      <Text style={styles.loginTitle}>Login</Text>
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
