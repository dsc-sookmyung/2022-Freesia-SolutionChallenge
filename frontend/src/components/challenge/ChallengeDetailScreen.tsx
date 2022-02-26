import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { Divider, ProfileIcon, mainStyle } from "../../CommonComponent";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

const postInfo = {
  profileImage: require("../../../assets/profile_default.jpg"),
  nickname: "nickname",
  image: require("../../../assets/tori.jpg"),
  title: "titleeeeeeeeeee",
  contents: "contentssssssssss",
};

export default function ChallengeDetail({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = () =>
    navigation.navigate("EditChallengeScreen", { postInfo });
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <View style={{ ...mainStyle.mainView, paddingHorizontal: 0 }}>
      <View style={styles.topBar}>
        <View style={styles.topProfile}>
          <ProfileIcon imagePath={postInfo.profileImage} />
          <Text style={styles.nicknameText}>{postInfo.nickname}</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity onPress={handleEdit}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity onPress={handleDelete}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <Image style={styles.detailImage} source={postInfo.image} />
      <View style={styles.postTexts}>
        <Text style={styles.postTitle}>{postInfo.title}</Text>
        <Divider />
        <Text>{postInfo.contents}</Text>
      </View>
    </View>
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
  postTexts: {
    padding: 10,
  },
  postTitle: {
    fontWeight: "700",
  },
  modalView: {
    padding: 10,
    width: "25%",
    backgroundColor: "white",
    position: "absolute",
    top: 110,
    right: 10,
    elevation: 10,
  },
});
