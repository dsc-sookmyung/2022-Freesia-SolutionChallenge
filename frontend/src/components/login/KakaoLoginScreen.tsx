import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import * as WebBrowser from "expo-web-browser"; // localhost 대신 본인 컴퓨터 ip(IPv4) 주소
import WebView from "react-native-webview";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();
//const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

export default function KakaoLoginScreen({ navigation }: any) {
  function LogInProgress(data) {
    const exp = "code=";
    var condition = data.indexOf(exp);

    if (condition != -1) {
      var request_code = data.substring(condition + exp.length);
      requestToken(request_code);
    }
  }

  /* const requestToken = async (request_code) => {
    var returnValue = "none";
    var request_token_url = "https://kauth.kakao.com/oauth/token";

    axios({
      method: "post",
      url: request_token_url,
      params: {
        grant_type: "authorization_code",
        client_id: "a7ac9a3c907cb33f1ea7c91eac834072",
        redirect_uri: "url",
        code: request_code,
      },
    })
      .then(function (response) {
        returnValue = response.data.access_token;
        console.log(returnValue);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }; */
  const requestToken = async (event) => {
    console.log(event);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source={{
          uri: "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=a7ac9a3c907cb33f1ea7c91eac834072&redirect_uri=https://auth.expo.io/@nrj022/frontend",
        }}
        onMessage={(event) => {
          console.log(event);
          requestToken(event);
        }}
      />
    </View>
  );
}
