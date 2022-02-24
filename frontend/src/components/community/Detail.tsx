import React, { useState } from "react";
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider, ProfileIcon } from "../../CommonComponent";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Detail({ route }: any) {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.header}>
        <View style={styles.nicknameArea}>
          <ProfileIcon imagePath={null} />
          <Text style={styles.nickname}>{route.params.nickname}</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="menu-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.image}>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>{route.params.title}</Text>
        <Divider />
        <Text>{route.params.content}</Text>
        <View style={styles.status}>
          <View style={styles.likes}>
            <Ionicons name="flower" size={30} color="black" />
            <Ionicons name="flower-outline" size={30} color="black" style={{ marginRight: 5 }} />
            <Text>{route.params.likes} Likes</Text>
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
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  nicknameArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  nickname: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    backgroundColor: "grey",
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
  modalView: {
    width: SCREEN_WIDTH,
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 13,
    elevation: 20,
  },
});