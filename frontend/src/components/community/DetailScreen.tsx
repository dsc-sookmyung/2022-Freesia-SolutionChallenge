import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Modal, ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert, ToastAndroid, TextInput } from "react-native";
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { Divider, ProfileIcon } from "../../CommonComponent";
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import axiosInstance from "../../axiosInstance";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../color";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const renderItem = ({ item, index }, parallaxProps) => {
  return (
    <View style={styles.item}>
      <ParallaxImage
        source={{ uri: item }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0}
        {...parallaxProps}
      />
    </View>
  );
};

export default function DetailScreen({ navigation, route }: any) {

  const [writer, setWriter] = useState<string>(""); // 글쓴 사람 이메일
  const [email, setEmail] = useState<string>(""); // 로그인한 유저 이메일
  AsyncStorage.getItem('email').then(response => setEmail(response));
  const [index, setIndex] = useState(0);
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  useEffect(() => {
    axiosInstance.get(`/auth/community?id=${route.params.id}`)
      .then(function (response) {
        setEntries(response.data.filePath);
        setWriter(response.data.email);
      }).catch(function (error) {
        console.log(error);
      });
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const [likes, setLikes] = useState(0);
  useEffect(() => {
    axiosInstance.get(`/auth/likes/cnt?pid=${route.params.id}`)
      .then(function (response) {
        setLikes(response.data);
      }).catch(function (error) {
        console.log(error);
      });
  }, []);
  const [focused, setFocused] = useState(false);
  const iconName: string = focused ? "flower" : "flower-outline";
  const likeEvent = () => {
    if (focused == false) {
      axiosInstance.post(`/auth/likes`, {
        pid: route.params.id,
        uid: email,
      }).then(function (response) {
        ToastAndroid.show("Like this Post!", ToastAndroid.SHORT);
        setFocused(!focused);
        setLikes((prevCount: number) => prevCount + 1);
      }).catch(function (error) {
        console.log(error);
      });
    }
    else {
      axiosInstance.delete(`/auth/likes?id=${route.params.id}`)
        .then(function (response) {
          ToastAndroid.show("Canceled", ToastAndroid.SHORT);
          setFocused(!focused);
          setLikes((prevCount: number) => prevCount - 1);
        }).catch(function (error) {
          console.log(error);
        });
    }
  };
  const showModal = () => {
    if (email == writer) {
      setModalVisible(true);
    } else {
      Alert.alert('Warning', 'This is an author-only feature.');
    };
  };
  const gotoEdit = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Edit', {
      id: route.params.id,
      category: route.params.category,
      images: entries,
      title: route.params.title,
      content: route.params.content,
    });
  };
  const deletePost = () => {
    Alert.alert('Warning', 'Do you want to delete post?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          setModalVisible(!modalVisible);
          axiosInstance.delete(`/auth/community?id=${route.params.id}`)
            .then(function (response) {
              ToastAndroid.show("Deleted Successfully!", ToastAndroid.SHORT);
              navigation.dispatch(StackActions.popToTop);
            }).catch(function (error) {
              console.log(error);
            });
        }
      },
    ]);
  };

  // 댓글 기능
  const [comment, setComment] = useState<string>("");
  const onChangeComment = (e: string) => setComment(e);
  const [commentCount, setCommentCount] = useState<number>(); // 댓글 개수
  const [commentList, setCommentList] = useState([]); // 댓글 리스트
  const [newComment, setNewComment] = useState<string>(); // 수정된 댓글
  const onChangeNewComment = (e: string) => setNewComment(e);
  const [commentEditorVisible, setCommentEditorVisible] = useState(false); // 글 수정 모달창

  useEffect(() => {
    axiosInstance.get(`/auth/comment?pid=${route.params.id}`)
      .then(function (response) {
        setCommentList(response.data);
        setCommentCount(response.data.length);
      }).catch(function (error) {
        console.log(error);
      });
  }, []);
  const createComment = () => {
    axiosInstance.post(`/auth/comment`, {
      content: comment,
      pid: route.params.id,
      uid: email
    }).then(function (response) {
      ToastAndroid.show("Submitted Successfully!", ToastAndroid.SHORT);
      setComment("");
    }).catch(function (error) {
      console.log(error);
    });
  };
  const editComment = (id: number) => {
    axiosInstance.put(`/auth/comment?id=${id}`, {
      content: newComment,
    }).then(function (response) {
      ToastAndroid.show("Edited Successfully!", ToastAndroid.SHORT);
      setCommentEditorVisible(false);
    }).catch(function (error) {
      console.log(error);
    });
  };
  const deleteComment = (id: number) => {
    Alert.alert('Warning', 'Do you want to delete a comment?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          axiosInstance.delete(`/auth/comment?id=${id}`
          ).then(function (response) {
            ToastAndroid.show("Deleted Successfully!", ToastAndroid.SHORT);
          }).catch(function (error) {
            console.log(error);
          });
        }
      },
    ]);
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
            <TouchableOpacity onPress={deletePost}>
              <Text style={styles.modalText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.header}>
        <View style={styles.nicknameArea}>
          <ProfileIcon imagePath={null} />
          <Text style={styles.nicknameText}>{route.params.nickName}</Text>
        </View>
        <TouchableOpacity onPress={showModal}>
          <Ionicons name="menu-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>

      <Carousel
        ref={carouselRef}
        sliderWidth={SCREEN_WIDTH}
        sliderHeight={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
        onSnapToItem={(index) => setIndex(index)}
      />
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={index}
        containerStyle={styles.dotContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />

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
            <Text>{commentCount} Comments</Text>
          </View>
        </View>
        <Text style={styles.date}>{route.params.createdDate}</Text>
        <View style={styles.commentInputArea}>
          <TextInput multiline placeholder="Comment" value={comment} onChangeText={onChangeComment} style={styles.commentInput} />
          <TouchableOpacity onPress={createComment}>
            <Entypo name="direction" size={30} color="black" />
          </TouchableOpacity>
        </View>
        {commentList.map((comment, index) =>
          <View style={styles.commentArea} key={index}>
            <Text style={{ fontWeight: "bold", flex: 2 }}>{comment.uid.nickName}</Text>
            <Text style={{ flex: 6, marginHorizontal: 10 }}>{comment.content}</Text>
            {comment.uid.email == email ? (
              <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableOpacity onPress={() => setCommentEditorVisible(true)}>
                  <MaterialIcons name="edit" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteComment(comment.id)}>
                  <MaterialIcons name="delete" size={20} color="black" />
                </TouchableOpacity>
              </View>
            ) : <View style={{ flex: 1 }}></View>}

            <Modal
              animationType="fade"
              transparent={true}
              statusBarTranslucent={true}
              visible={commentEditorVisible}
              onRequestClose={() => setCommentEditorVisible(!commentEditorVisible)}
            >
              <View style={styles.commentOverlay}>
                <View style={styles.commentModalView}>
                  <TouchableOpacity onPress={() => setCommentEditorVisible(!commentEditorVisible)} style={{ alignSelf: "flex-end" }}>
                    <Ionicons name="close" size={24} color="black" />
                  </TouchableOpacity>
                  <TextInput multiline placeholder={comment.content} value={newComment} onChangeText={onChangeNewComment} style={styles.commentModalInput} />
                  <TouchableOpacity onPress={() => editComment(comment.id)}>
                    <Text style={styles.saveBtn}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}


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
  item: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  dotContainer: {
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  inactiveDotStyle: {
    backgroundColor: 'grey',
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
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    width: SCREEN_WIDTH,
    textAlign: "center",
    paddingVertical: 15,
  },
  commentInputArea: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
  },
  commentArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  commentOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  commentModalView: {
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  commentModalInput: {
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    marginBottom: 5,
    textAlign: "center",
  },
  saveBtn: {
    fontSize: 16,
    backgroundColor: theme.devideBg,
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
});