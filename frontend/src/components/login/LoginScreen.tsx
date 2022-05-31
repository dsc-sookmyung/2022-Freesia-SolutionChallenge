import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  TextInput,
  Alert,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { mainStyle, Divider, BASE_URL } from "../../CommonComponent";

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }: any) {
  // 일반 로그인
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const onChangeId = (e: string) => setId(e);
  const onChangePw = (e: string) => setPw(e);

  const idNotCompleteAlert = () => {
    Alert.alert("", "Please Enter Your Id", [{ text: "OK" }]);
  };

  const pwNotCompleteAlert = () => {
    Alert.alert("", "Please Enter Your Password", [{ text: "OK" }]);
  };

  const loginFailAlert = () => {
    Alert.alert("Login Failed", "Please Check Your Id and Password", [
      { text: "OK" },
    ]);
  };

  const checkFormComplete = () => {
    id == "" ? (pw == "" ? idNotCompleteAlert() : null) : null;
    pw == "" ? pwNotCompleteAlert() : null;

    id != "" && pw != "" ? login() : null;
  };

  const login = () => {
    let body = {
      loginId: id,
      password: pw,
    };

    axios
      .post(`${BASE_URL}/generalLogin?loginId=${id}&password=${pw}`)
      .then(function (response) {
        AsyncStorage.setItem("token", response.data.token); // 로컬에 토큰 저장
        AsyncStorage.setItem("email", response.data.email); // 로컬에 이메일 저장
      })
      .then(() => {
        ToastAndroid.show("Saved Successfully!", ToastAndroid.SHORT);
        navigation.dispatch(StackActions.popToTop);
      })
      .catch(function (error) {
        loginFailAlert();
        console.log(error);
      });
  };

  // 구글 로그인
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "47936525334-hf646aag67peinnmtnad57j8tu1dnt88.apps.googleusercontent.com",
    androidClientId:
      "47936525334-nbb6as274m9vd73h4ejlaiddoe160jtj.apps.googleusercontent.com",
  });

  // 사용자 정보 조회
  const [nickname, setNickname] = useState<string>();
  const [email, setEmail] = useState<string>("");
  AsyncStorage.getItem("email").then((response) => setEmail(response));

  const getUser = async () => {
    try {
      const response = await axiosInstance.get(`/api/user?email=${email}`);
      setNickname(response.data.nickName);
      console.log(response.data);
      if (nickname == null) {
        navigation.navigate("SocialSignup");
      } else {
        navigation.dispatch(StackActions.popToTop());
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      // 서버에 전송
      axios
        .post(`${BASE_URL}/google`, {
          accessToken: authentication.accessToken,
        })
        .then(function (response) {
          AsyncStorage.setItem("token", response.data.token); // 로컬에 토큰 저장
          AsyncStorage.setItem("email", response.data.email); // 로컬에 이메일 저장
          ToastAndroid.show("Logged In Successfully!", ToastAndroid.SHORT);
          getUser();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [response]);

  const onPressSocial = () => {
    navigation.navigate("KakaoLogin");
  };

  return (
    <View style={{ ...styles.login, ...mainStyle.mainView }}>
      <Text style={styles.loginTitle}>LOGIN</Text>
      <TextInput
        placeholder="Id"
        value={id}
        onChangeText={onChangeId}
        style={mainStyle.textInput}
      />
      <TextInput
        placeholder="Password"
        value={pw}
        onChangeText={onChangePw}
        style={mainStyle.textInput}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={() => checkFormComplete()}>
        <View
          style={{
            ...mainStyle.buttonContainer,
          }}
        >
          <Text style={{ ...mainStyle.buttonTitle }}>LOGIN</Text>
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.orDivider}>
        <Divider />
        <Text style={styles.orText}>OR</Text>
        <Divider />
      </View>
      {/* <Text style={styles.loginTitle}>Social Login</Text> */}
      <TouchableOpacity
        style={{
          ...mainStyle.buttonContainer,
          backgroundColor: "#309CFF",
          marginVertical: 0,
        }}
        onPress={() => promptAsync()}
      >
        <Text style={{ ...mainStyle.buttonTitle, color: "white" }}>
          GOOGLE LOGIN
        </Text>
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
    color: "black",
    fontWeight: "700",
    marginBottom: 20,
  },
  orDivider: { flexDirection: "row", marginVertical: 20 },
  orText: { marginHorizontal: 20, color: "lightgrey" },
  signupText: {
    marginLeft: 8,
    color: "black",
    fontWeight: "bold",
  },
});
