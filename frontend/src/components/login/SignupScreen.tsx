import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  ToastAndroid,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import { theme } from "../../color";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {
  BASE_URL,
  mainStyle,
  screenHeight,
  screenWidth,
} from "../../CommonComponent";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function SignupScreen({ navigation }: any) {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [codeSent, setCodeSent] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [wrongMsg, setWrongMsg] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };
  const onChangeId = (e: string) => setId(e);
  const onChangePw = (e: string) => setPw(e);
  const onChangeEmail = (e: string) => setEmail(e);
  const onChangeNickname = (e: string) => setNickname(e);
  const onChangeUsername = (e: string) => setUsername(e);
  const onChangeGoal = (e: string) => setGoal(e);
  const onChangeCode = (e: string) => setCode(e);

  // form 작성 미완료 시 알림
  const notCompleteAlert = () => {
    Alert.alert("Some Informations are Missing", "Please check your form", [
      { text: "OK" },
    ]);
  };

  // 회원가입 실패 시 알림
  const signupFailAlert = () => {
    Alert.alert("Sign Up Failed", "Please Try Again", [{ text: "OK" }]);
  };

  // form 모두 작성했는지 확인
  const checkFormComplete = () => {
    id == "" ||
    pw == "" ||
    nickname == "" ||
    goal == "" ||
    email == "" ||
    username == "" ||
    profileImage == null
      ? notCompleteAlert()
      : save();
  };

  // 회원가입
  const save = () => {
    if (verified) {
      let body = new FormData();
      body.append("email", email);
      body.append("goalMsg", goal);
      body.append("loginId", id);
      body.append("nickName", nickname);
      body.append("password", pw);
      let profileImg: any = {
        uri: profileImage,
        type: "image/png",
        name: `0.png`,
      };
      body.append("profileImg", profileImg);
      body.append("username", username);

      // 서버에 전송
      axios
        .post(`${BASE_URL}/generalJoin`, body, {
          headers: { "content-type": `multipart/form-data` },
          transformRequest: (data, headers) => {
            return body;
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .then(() => {
          navigation.navigate("Login");
          ToastAndroid.show("Sign Up Successfully!", ToastAndroid.SHORT);
        })
        .catch(function (error) {
          console.log(error);
          signupFailAlert();
        });
    }
  };

  const checkEmail = () => {
    if (email != "") {
      console.log(email);
      axios
        .post(`${BASE_URL}/sendAuthEmail?email=${email}`)
        .then(function (response) {
          console.log(response.data);
          setCodeSent(response.data);
          setModalVisible(!modalVisible);
        })
        .catch(function (error) {
          console.log(error);
          ToastAndroid.show("Invalid email", ToastAndroid.SHORT);
        });
    } else {
      Alert.alert("", "Please Enter Your Email", [{ text: "OK" }]);
    }
  };

  const checkCode = () => {
    if (codeSent == code) {
      ToastAndroid.show("Verified!", ToastAndroid.SHORT);
      setModalVisible(!modalVisible);
      setVerified(true);
    } else {
      setWrongMsg(true);
    }
  };

  const ModalView = () => (
    <View style={styles.modalView}>
      <View>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          We send the verification code to
        </Text>
        <Text
          style={{
            fontWeight: "700",
            marginBottom: 10,
          }}
        >
          {email}
        </Text>
        <Text>Please enter your code.</Text>
        <Text
          style={{
            color: wrongMsg ? "red" : "transparent",
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          Verification code does not match.
        </Text>
        <TextInput
          value={code}
          placeholder="Verification Code"
          onChangeText={onChangeCode}
          style={styles.modalInput}
        />
      </View>
      <View style={styles.modalButton}>
        <TouchableOpacity onPress={checkCode}>
          <Text style={{ fontWeight: "700" }}>확인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
            setWrongMsg(false);
          }}
        >
          <Text style={{ fontWeight: "700" }}>취소</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          color: "black",
          fontWeight: "700",
          marginBottom: 20,
        }}
      >
        SIGN UP
      </Text>
      <TouchableOpacity onPress={pickImage} style={styles.addImage}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Ionicons name="person" size={80} color="white" />
        )}
      </TouchableOpacity>
      <View style={styles.signUpForm}>
        <TextInput
          value={id}
          placeholder="Id"
          onChangeText={onChangeId}
          style={mainStyle.textInput}
        />
        <TextInput
          value={pw}
          placeholder="Password"
          onChangeText={onChangePw}
          style={mainStyle.textInput}
          secureTextEntry={true}
        />
        <View style={styles.emailForm}>
          <TextInput
            value={email}
            placeholder="Email"
            onChangeText={onChangeEmail}
            editable={!verified}
            style={styles.textInputEmail}
          />
          <TouchableOpacity onPress={checkEmail}>
            <Text style={styles.checkEmail}>인증</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          statusBarTranslucent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <ModalView />
        </Modal>
        <TextInput
          value={username}
          placeholder="Username"
          onChangeText={onChangeUsername}
          style={mainStyle.textInput}
        />
        <TextInput
          value={nickname}
          placeholder="Nickname"
          onChangeText={onChangeNickname}
          style={mainStyle.textInput}
        />
        <TextInput
          value={goal}
          placeholder="Goal"
          onChangeText={onChangeGoal}
          style={mainStyle.textInput}
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={mainStyle.buttonContainer}
          onPress={() => checkFormComplete()}
        >
          <Text style={mainStyle.buttonTitle}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  signUpForm: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInputEmail: {
    width: 240,
    elevation: 2,
    borderRadius: 50,
    backgroundColor: "white",
    marginVertical: 12,
    marginRight: 10,
    padding: 5,
    paddingHorizontal: 15,
  },
  emailForm: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addImage: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    backgroundColor: "lightgrey",
    borderRadius: SCREEN_WIDTH / 8,
    marginVertical: 10,
    overflow: "hidden",
  },
  checkEmail: {
    width: 50,
    elevation: 2,
    borderRadius: 50,
    marginVertical: 12,
    paddingVertical: 6,
    backgroundColor: theme.headerBg,
    textAlign: "center",
    textAlignVertical: "center",
  },
  buttonView: { width: "100%", alignItems: "center" },
  modalView: {
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    height: screenHeight / 3,
    width: screenWidth,
    top: screenHeight / 3,
    marginHorizontal: (SCREEN_WIDTH - screenWidth) / 2,
    elevation: 15,
    padding: 20,
  },
  modalInput: {
    width: screenWidth - 40,
    height: 50,
    borderColor: "lightgrey",
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  modalButton: {
    width: screenWidth / 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
