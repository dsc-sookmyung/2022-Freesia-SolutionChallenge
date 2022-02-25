import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import * as Linking from "expo-linking";

export default function Login() {
  const API_BASE_URL = "http://localhost:8080";

  const OAUTH2_REDIRECT_URI = "http://localhost:19002/oauth2/redirect";

  const GOOGLE_AUTH_URL =
    API_BASE_URL +
    "/oauth2/authorization/google?redirect_uri=" +
    OAUTH2_REDIRECT_URI;
  const FACEBOOK_AUTH_URL =
    API_BASE_URL +
    "/oauth2/authorization/facebook?redirect_uri=" +
    OAUTH2_REDIRECT_URI;
  const NAVER_AUTH_URL =
    API_BASE_URL +
    "/oauth2/authorization/naver?redirect_uri=" +
    OAUTH2_REDIRECT_URI;
  const KAKAO_AUTH_URL =
    API_BASE_URL +
    "/oauth2/authorization/kakao?redirect_uri=" +
    OAUTH2_REDIRECT_URI;

  const handleLogin = () => {
    Linking.openURL(GOOGLE_AUTH_URL);
  };

  return (
    <View style={styles.login}>
      <Text style={styles.loginTitle}>Login</Text>
      <TouchableOpacity onPress={handleLogin}>
        <View style={{ ...styles.socialLogin, backgroundColor: "#FFE500" }}>
          <Text style={{ ...styles.socialLoginTitle, color: "#684848" }}>
            KaKao Login
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <View style={{ ...styles.socialLogin, backgroundColor: "#309CFF" }}>
          <Text style={styles.socialLoginTitle}>Google Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
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
