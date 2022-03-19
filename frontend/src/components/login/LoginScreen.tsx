import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  TextInput,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { theme } from "../../color";

import { mainStyle, Divider, ipAddress } from "../../CommonComponent";

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }: any) {
  // 일반 로그인
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const onChangeId = (e: string) => setId(e);
  const onChangePw = (e: string) => setPw(e);
  const login = () => {
    let body = {
      loginId: id,
      password: pw,
    };

    /* axios
      .post(`http://${ipAddress}:8080/api/generalLogin`, JSON.stringify(body))
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      }); */
    fetch(`http://${ipAddress}:8080/api/generalLogin`, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((data) => console.log("success : " + data))
      .catch((err) => console.log(err));
    // 서버에 전송
    //AsyncStorage.setItem("token", response.data.token);
    ToastAndroid.show("Saved Successfully!", ToastAndroid.SHORT);
    //navigation.dispatch(StackActions.popToTop);
  };

  // 구글 로그인
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "47936525334-hf646aag67peinnmtnad57j8tu1dnt88.apps.googleusercontent.com",
    androidClientId:
      "47936525334-nbb6as274m9vd73h4ejlaiddoe160jtj.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      // 서버에 전송
      axiosInstance
        .post(`/auth/google`, {
          accessToken: authentication.accessToken,
        })
        .then(function (response) {
          AsyncStorage.setItem("token", response.data.token); // 로컬에 토큰 저장
          ToastAndroid.show("Logged In Successfully!", ToastAndroid.SHORT);
        })
        .catch(function (error) {
          console.log(error);
        });
      // access token으로 서버에서 유저 정보 받아옴
      // nickname == null 이면 회원가입 창으로 이동
      navigation.navigate("SocialSignup");
      // nickname != null 이면 stack의 첫 화면으로 이동
      // navigation.dispatch(StackActions.popToTop);
    }
  }, [response]);

  const onPressSocial = () => {
    navigation.navigate("KakaoLogin");
  };

  return (
    <View style={{ ...styles.login, ...mainStyle.mainView }}>
      <Text style={styles.loginTitle}>Login</Text>
      <View style={styles.loginForm}>
        <View style={styles.inputForm}>
          <Text style={styles.text}>ID</Text>
          <TextInput
            value={id}
            onChangeText={onChangeId}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            value={pw}
            onChangeText={onChangePw}
            style={styles.textInput}
            secureTextEntry={true}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => login()}>
        <View
          style={{
            ...styles.socialLogin,
            backgroundColor: theme.headerBg,
            marginVertical: 20,
          }}
        >
          <Text style={{ ...styles.socialLoginTitle, color: "black" }}>
            Login
          </Text>
        </View>
      </TouchableOpacity>
      <Text>If you don't have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={{ textDecorationLine: "underline" }}>Sign Up</Text>
      </TouchableOpacity>

      <Divider />
      {/* <Text style={styles.loginTitle}>Social Login</Text> */}
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginTitle: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 20,
  },
  loginForm: {
    position: "relative",
  } /* 
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
    marginBottom: 10,
  }, */,
  text: {
    position: "absolute",
    right: 330,
    fontSize: 20,
  },
  inputForm: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    width: 300,
    elevation: 2,
    borderRadius: 50,
    backgroundColor: "white",
    margin: 15,
  },
  socialLogin: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 40,
    borderRadius: 20,
    marginVertical: 6,
  },
  socialLoginTitle: {
    color: "white",
    fontSize: 18,
  },
});
