/* import React from "react";
import { StyleSheet, View, Button, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser"
//import * as Google from "expo-google-app-auth";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const storeLoginData = async (userInfo) => {
    try {
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (e) {
      console.log("유저 토큰 저장 실패");
    }
  };
  const signInAsync = async () => {
    console.log("LoginScreen.tsx 6 | loggin in");
    try {
      const [request, response, promptAsync] = await Google.useAuthRequest({
        iosClientId: "<YOUR_IOS_CLIENT_ID>",
        androidClientId:
          "686461883540-gifkun9ko001mrk4s498q6v2c3bg54af.apps.googleusercontent.com",
        expoClientId:""
      });

      console.log(response?.type==="success");
    } catch (error) {
      console.log("LoginScreen.tsx 19 | error with login", error);
    }
  };
  return (
    <View style={styles.login}>
      <Text style={styles.loginTitle}>Login</Text>
      <TouchableOpacity onPress={signInAsync}>
        <View style={{ ...styles.socialLogin, backgroundColor: "#309CFF" }}>
          <Text style={styles.socialLoginTitle}>Google Login</Text>
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
 */
