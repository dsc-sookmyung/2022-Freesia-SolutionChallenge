import React, { useState, useRef } from "react";
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
import { Divider, ProfileIcon, mainStyle } from "../../CommonComponent";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import EmojiPicker from "rn-emoji-keyboard";

const screenWidth = Dimensions.get("window").width;

const postInfo = {
  profileImage: require("../../../assets/profile_default.jpg"),
  nickname: "nickname",
  image: require("../../../assets/tori.jpg"),
  title: "titleeeeeeeeeee",
  contents: "contentssssssssss",
  postDate: "2022.2.27",
};

export default function ChallengeDetail({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState([]);

  const handleEdit = () =>
    navigation.navigate("EditChallengeScreen", { postInfo });
  const handleDelete = () => {
    console.log("delete");
  };

  const handlePick = (emojiObject) => {
    console.log(emojiObject);
  };

  const PostContent = ({ item }) => {
    return <Text style={styles.postDate}>{postInfo.postDate}</Text>;
  };

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });
  return (
    <ScrollView style={{ ...mainStyle.mainView, paddingHorizontal: 0 }}>
      <View style={styles.topBar}>
        <View style={styles.topProfile}>
          <ProfileIcon imagePath={postInfo.profileImage} />
          <Text style={styles.nicknameText}>{postInfo.nickname}</Text>
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
          <Text style={styles.postTitle}>{postInfo.title}</Text>
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
        <Text>{postInfo.contents}</Text>
      </View>
      <FlatList
        data={postInfo}
        viewabilityConfig={viewConfigRef.current}
        renderItem={PostContent}
        keyExtractor={(c) => c.id}
      />
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
});
