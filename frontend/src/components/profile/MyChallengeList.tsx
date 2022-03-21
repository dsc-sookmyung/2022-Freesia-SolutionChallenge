import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { screenWidth } from "../../CommonComponent";
import axiosInstance from "../../axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const numColumns = 3;

const PostItem = ({ item }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.postView}
    >
      <Image source={{ uri: item.filePath }} style={styles.image} />
    </TouchableOpacity>
  );
};

export default function MyChallengeList() {

  // localStorage에 저장된 이메일 불러오기
  const [email, setEmail] = useState<string>("");
  AsyncStorage.getItem('email').then(response => setEmail(response));

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axiosInstance.get(`/auth/mypage/challenge?email=${email}`)  // 내가 쓴 챌린지 글 조회
      .then(function (response) {
        setPosts(response.data);
      }).catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={PostItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postView: {
    backgroundColor: "#eeeeee",
    width: (screenWidth * 0.96) / numColumns,
    height: (screenWidth * 0.96) / numColumns,
    margin: (screenWidth * 0.04) / (numColumns * 2),
  },
  image: {
    width: "100%",
    height: "100%",
  },
})