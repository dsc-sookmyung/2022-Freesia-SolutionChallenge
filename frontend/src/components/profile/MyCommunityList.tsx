import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../color";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyCommunityList({ navigation }: any) {

  // localStorage에 저장된 이메일 불러오기
  const [email, setEmail] = useState<string>("");
  AsyncStorage.getItem('email').then(response => setEmail(response));

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axiosInstance.get(`/api/mypage/community?email=${email}`)  // 내가 쓴 커뮤니티 글 조회
      .then(function (response) {
        setPosts(response.data);
      }).catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {posts.slice(0).reverse().map((post, index) =>
        <View key={index}>
          <TouchableOpacity style={styles.list}>
            <View>
              <Text style={styles.category}>{post.category}</Text>
            </View>
            <View style={styles.contentArea}>
              <Text style={styles.title}>{post.title}</Text>
              <Text numberOfLines={2}>{post.content}</Text>
            </View>
            <View>
              <Text style={styles.date}>{post.createdDate}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ width: "100%", height: 2, backgroundColor: theme.devideBg }}></View>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
  category: {
    fontSize: 12,
    color: theme.grey,
  },
  contentArea: {
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    color: "grey",
  },
});