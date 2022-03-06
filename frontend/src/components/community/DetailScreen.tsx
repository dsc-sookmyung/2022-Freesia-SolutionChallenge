import React, { useState } from "react";
import { Dimensions, Modal, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Divider, ProfileIcon } from "../../CommonComponent";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function DetailScreen({ navigation, route }: any) {

  const [modalVisible, setModalVisible] = useState(false);
  const [likes, setLikes] = useState(route.params.likes);
  const [focused, setFocused] = useState(false);
  const iconName: string = focused ? "flower" : "flower-outline";
  const likeEvent = () => {
    if (focused == false) {
      setFocused(!focused);
      setLikes((prevCount: number) => prevCount + 1);
    }
    else {
      setFocused(!focused);
      setLikes((prevCount: number) => prevCount - 1);
    }
  };
  const gotoEdit = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Edit', {
      id: route.params.id,
      category: route.params.category,
      nickname: route.params.nickname,
      image: route.params.image,
      title: route.params.title,
      content: route.params.content,
      likes: route.params.likes,
      comments: route.params.comments,
      date: route.params.date
    });
  };

  return (
    <ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity activeOpacity={0} onPress={() => setModalVisible(!modalVisible)} style={styles.overlay}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={gotoEdit}>
              <Text style={styles.modalText}>Edit</Text>
            </TouchableOpacity>
            <View style={{ width: "100%", height: 1, backgroundColor: "#eeeeee" }}></View>
            <TouchableOpacity>
              <Text style={styles.modalText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.header}>
        <View style={styles.nicknameArea}>
          <ProfileIcon imagePath={null} />
          <Text style={styles.nicknameText}>{route.params.nickname}</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="menu-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: route.params.image }} style={styles.image} />

      <View style={styles.container}>
        <Text style={styles.title}>{route.params.title}</Text>
        <Divider />
        <Text>{route.params.content}</Text>
        <View style={styles.status}>
          <View style={styles.likes}>
            <TouchableOpacity onPress={() => likeEvent()}>
              <Ionicons name={iconName} size={30} color="black" style={{ marginRight: 5 }} />
            </TouchableOpacity>
            <Text>{likes} Likes</Text>
          </View>
          <View style={styles.comments}>
            <Ionicons name="chatbubble-ellipses-outline" size={30} color="black" style={{ marginRight: 5 }} />
            <Text>{route.params.comments} Comments</Text>
          </View>
        </View>
        <Text style={styles.date}>{route.params.date}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  nicknameArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  nicknameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  container: {
    padding: 10,
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
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: SCREEN_WIDTH,
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    width: SCREEN_WIDTH,
    textAlign: "center",
    paddingVertical: 15,
  },
});