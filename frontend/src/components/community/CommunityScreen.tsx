import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useState } from "react";
import { Ionicons, AntDesign, EvilIcons } from '@expo/vector-icons';
import { theme } from '../../color';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// 테스트용 데이터
const posts = [
  { id: 1, category: 'worries', nickname: 'alice', title: 'title', content: 'main text1', likes: 1, comments: 1, date: "2022.02.22" },
  { id: 2, category: 'review', nickname: 'bear', title: 'title', content: 'main text2', likes: 2, comments: 1, date: "2022.02.22" },
  { id: 3, category: 'review', nickname: 'cake', title: 'title', content: 'main text3', likes: 3, comments: 1, date: "2022.02.22" },
  { id: 4, category: 'review', nickname: 'diana', title: 'title', content: 'main text4', likes: 4, comments: 1, date: "2022.02.22" },
  { id: 5, category: 'review', nickname: 'egg', title: 'title', content: 'main text5', likes: 5, comments: 1, date: "2022.02.22" },
  { id: 6, category: 'review', nickname: 'love', title: 'title', content: 'main text6', likes: 6, comments: 1, date: "2022.02.22" },
  { id: 7, category: 'review', nickname: 'famous', title: 'title', content: 'main text7', likes: 6, comments: 1, date: "2022.02.22" },
  { id: 8, category: 'gathering', nickname: 'famous', title: 'title', content: 'main text8', likes: 6, comments: 1, date: "2022.02.22" },
  { id: 9, category: 'gathering', nickname: 'famous', title: 'title', content: 'main text9', likes: 6, comments: 1, date: "2022.02.22" },
  { id: 10, category: 'gathering', nickname: 'famous', title: 'title', content: 'main text10', likes: 6, comments: 1, date: "2022.02.22" },
]

type postType = { id: number; category?: string; nickname: string; title: string; content: string; likes: number; comments: number; date: any; };

export default function CommunityScreen({ navigation }: any) {

  const [category, setCategory] = useState<string>("worries");
  const worries = () => setCategory("worries");
  const review = () => setCategory("review");
  const gathering = () => setCategory("gathering");

  const gotoCreate = () => {
    navigation.navigate('Create');
  };

  const gotoDetail = (item: postType) => {
    navigation.navigate('Detail', {
      id: item.id,
      nickname: item.nickname,
      title: item.title,
      content: item.content,
      likes: item.likes,
      comments: item.comments,
      date: item.date
    });
  };

  return (
    <View style={styles.container}>

      {/* category */}
      <View style={styles.header}>
        <TouchableOpacity onPress={worries}>
          <Text style={{ ...styles.category, color: category === "worries" ? "black" : theme.grey, borderBottomWidth: category === "worries" ? 3 : null }}>worries</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={review}>
          <Text style={{ ...styles.category, color: category === "review" ? "black" : theme.grey, borderBottomWidth: category === "review" ? 3 : null }}>review</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={gathering}>
          <Text style={{ ...styles.category, color: category === "gathering" ? "black" : theme.grey, borderBottomWidth: category === "gathering" ? 3 : null }}>gathering</Text>
        </TouchableOpacity>
      </View>

      {/* list */}
      <ScrollView>
        {posts.map((post, index) =>
          post.category === category ?
            (
              <View key={index}>
                <TouchableOpacity onPress={() => gotoDetail(post)} style={styles.list}>
                  <View style={styles.nicknameArea}>
                    <EvilIcons name="user" size={30} color="black" />
                    <Text style={styles.nickname}>{post.nickname}</Text>
                  </View>
                  <View style={styles.contentArea}>
                    <Text>{post.content}</Text>
                  </View>
                  <View style={styles.statusArea}>
                    <View style={styles.likes}>
                      <AntDesign name="like2" size={20} color="black" style={{ marginRight: 5 }} />
                      <Text>{post.likes} likes</Text>
                    </View>
                    <View style={styles.comments}>
                      <Ionicons name="chatbubble-ellipses-outline" size={20} color="black" style={{ marginRight: 5 }} />
                      <Text>{post.comments} comments</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{ width: "100%", height: 5, backgroundColor: theme.devideBg }}></View>
              </View>
            ) : null
        )}
      </ScrollView>

      {/* add button */}
      <TouchableOpacity onPress={gotoCreate} style={styles.add}>
        <Ionicons name="add-circle" size={60} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT - 100,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderBottomColor: theme.devideBg,
    borderBottomWidth: 3,
  },
  category: {
    fontSize: 20,
  },
  add: {
    position: "absolute",
    top: SCREEN_HEIGHT - 180,
    right: 20,
    zIndex: 1,
  },
  list: {
    backgroundColor: "white",
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  nicknameArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  nickname: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 3,
  },
  contentArea: {
    marginVertical: 15,
  },
  statusArea: {
    flexDirection: "row",
  },
  likes: {
    flexDirection: "row",
    marginRight: 10,
  },
  comments: {
    flexDirection: "row",
  }
});