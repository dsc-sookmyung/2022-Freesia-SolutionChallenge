import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { theme } from "../../color";

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

export default function MyCommunityList({ navigation }: any) {

  return (
    <ScrollView style={styles.container}>
      {posts.map((post, index) =>
        <View key={index}>
          <TouchableOpacity style={styles.list}>
            <View>
              <Text style={styles.category}>{post.category}</Text>
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
    marginBottom: 15,
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