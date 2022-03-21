import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider, ProfileIcon, mainStyle } from "../../CommonComponent";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import EmojiPicker from "rn-emoji-keyboard";
import axiosInstance from "../../axiosInstance";

const screenWidth = Dimensions.get("window").width;

// 임시 데이터
const postInfo = {
  profileImage: require("../../../assets/profile_default.jpg"),
  nickname: "nickname",
  image: require("../../../assets/tori.jpg"),
  title: "titleeeeeeeeeee",
  contents: "contentssssssssss",
  postDate: "2022.2.27",
};

export default function ChallengeDetail({ route, navigation }: any) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const challengeId = route.params.challengeId;
  const authorEmail = route.params.authorEmail;
  const [postData, setPostData] = useState({});
  const [cheering, setCheering] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<String>("");
  const [cheeringId, setCheeringId] = useState();
  const [selectedEmoji, setSelectedEmoji] = useState([]);

  // 게시글 상세 정보 가져오기
  const getPostData = () => {
    axiosInstance
      .get(`/auth/challenge?id=${challengeId}`)
      .then(function (response) {
        setPostData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 현재 유저, 작성자 간 cheering 데이터 가져오기
  const getCheeringData = async () => {
    const email = await AsyncStorage.getItem("email");
    setUserEmail(email);
    axiosInstance
      .get(`/auth/cheering/mycheer?myEmail=${email}&yourEmail=${authorEmail}`)
      .then(function (response) {
        setCheering(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPostData();
    getCheeringData();
  }, []);

  // 챌린지 편집, 삭제 모달
  const handleEdit = () =>
    navigation.navigate("PostChallengeScreen", { postData, isCreate: false });
  const handleDelete = () => {
    console.log("delete");
    axiosInstance
      .delete(`/auth/challenge?id=${challengeId}`)
      .then(function (response) {
        navigation.navigate("ChallengeScreen");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function isCheeringId(element) {
    if (element.yourEmail == authorEmail) {
      return true;
    }
  }

  // 게시글 작성자 이메일로 cheering id 찾기
  const getCheeringId = () => {
    axiosInstance
      .get(`/auth/cheering/mycheer/list?userEmail=${userEmail}`)
      .then(function (response) {
        const cheering = response.data.find(isCheeringId);
        setCheeringId(cheering.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // cheering 취소
  const deleteCheering = () => {
    getCheeringId();
    axiosInstance
      .delete(`/auth/cheering?id=${cheeringId}`)
      .then(function (response) {
        setCheering(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // cheering 설정
  const postCheering = () => {
    axiosInstance
      .post(`/auth/cheering`, { myEmail: userEmail, yourEmail: authorEmail })
      .then(function (response) {
        setCheering(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePick = (emojiObject) => {
    console.log(emojiObject);
  };

  return (
    <ScrollView style={{ ...mainStyle.mainView, paddingHorizontal: 0 }}>
      <View style={styles.topBar}>
        <View style={styles.topProfile}>
          <ProfileIcon imagePath={postInfo.profileImage} />
          <Text style={styles.nicknameText}>
            {postData.uid == null ? null : postData.uid.nickName}
          </Text>
          <TouchableOpacity
            onPress={() => {
              cheering ? deleteCheering() : postCheering();
            }}
          >
            <Text
              style={{
                ...styles.nicknameText,
                color: cheering ? "orange" : "lightgrey",
              }}
            >
              Cheering
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="menu-outline" size={40} color="black" />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          statusBarTranslucent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <TouchableOpacity
            activeOpacity={0}
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.overlay}
          >
            <View style={styles.modalView}>
              <TouchableOpacity onPress={handleEdit}>
                <Text style={styles.modalText}>Edit</Text>
              </TouchableOpacity>
              <View
                style={{ width: "100%", height: 1, backgroundColor: "#eeeeee" }}
              ></View>
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.modalText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
      <Image style={styles.detailImage} source={postInfo.image} />
      <View style={styles.post}>
        <View style={styles.postTop}>
          <Text style={styles.postTitle}>{postData.title}</Text>
          <TouchableOpacity onPress={() => setIsOpen(true)}>
            <AntDesign name="heart" size={24} color="red" />
          </TouchableOpacity>
          <EmojiPicker
            onEmojiSelected={handlePick}
            open={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </View>
        <Divider />
        <Text>{postData.contents}</Text>
        <Text style={styles.createdDate}>{postData.createdDate}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  topProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  nicknameText: {
    fontWeight: "700",
    fontSize: 18,
    marginLeft: 10,
  },
  detailImage: {
    width: screenWidth,
    height: screenWidth,
  },
  post: {
    margin: 10,
  },
  postTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  status: {
    flexDirection: "row",
    marginVertical: 15,
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  comments: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    color: "grey",
    marginTop: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: screenWidth,
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    width: screenWidth,
    textAlign: "center",
    paddingVertical: 15,
  },
  postDate: {
    margin: 10,
    color: "grey",
    fontSize: 12,
  },
  createdDate: {
    marginTop: 30,
    fontSize: 10,
    color: "lightgrey",
  },
});
