import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenWidth } from "../../CommonComponent";

const numColumns = 3;

// 테스트용 데이터
const posts = [
  { id: 1, category: 'worries', nickname: 'alice', image: 'https://www.collinsdictionary.com/images/full/freesia_183445007.jpg', title: 'title', content: 'main text1', likes: 1, comments: 1, date: "2022.02.22" },
  { id: 2, category: 'review', nickname: 'bear', image: 'https://www.collinsdictionary.com/images/full/freesia_183445007.jpg', title: 'title', content: 'main text2', likes: 2, comments: 1, date: "2022.02.22" },
  { id: 3, category: 'review', nickname: 'cake', image: 'https://www.collinsdictionary.com/images/full/freesia_183445007.jpg', title: 'title', content: 'main text3', likes: 3, comments: 1, date: "2022.02.22" },
  { id: 4, category: 'review', nickname: 'diana', image: 'https://www.collinsdictionary.com/images/full/freesia_183445007.jpg', title: 'title', content: 'main text4', likes: 4, comments: 1, date: "2022.02.22" },
  { id: 5, category: 'review', nickname: 'egg', image: 'https://www.collinsdictionary.com/images/full/freesia_183445007.jpg', title: 'title', content: 'main text5', likes: 5, comments: 1, date: "2022.02.22" },
  { id: 6, category: 'review', nickname: 'love', image: 'https://www.collinsdictionary.com/images/full/freesia_183445007.jpg', title: 'title', content: 'main text6', likes: 6, comments: 1, date: "2022.02.22" },
  { id: 7, category: 'review', nickname: 'famous', image: 'https://www.collinsdictionary.com/images/full/freesia_183445007.jpg', title: 'title', content: 'main text7', likes: 6, comments: 1, date: "2022.02.22" },
  { id: 8, category: 'gathering', nickname: 'famous', image: 'https://www.collinsdictionary.com/images/full/freesia_183445007.jpg', title: 'title', content: 'main text8', likes: 6, comments: 1, date: "2022.02.22" },
  { id: 9, category: 'gathering', nickname: 'famous', image: 'https://www.collinsdictionary.com/images/full/freesia_183445007.jpg', title: 'title', content: 'main text9', likes: 6, comments: 1, date: "2022.02.22" },
  { id: 10, category: 'gathering', nickname: 'famous', image: 'https://www.collinsdictionary.com/images/full/freesia_183445007.jpg', title: 'title', content: 'main text10', likes: 6, comments: 1, date: "2022.02.22" },
  { id: 11, category: 'worries', nickname: 'famous', image: 'https://www.collinsdictionary.com/images/full/freesia_183445007.jpg', title: 'title', content: 'main text10', likes: 6, comments: 1, date: "2022.02.22" },
  { id: 12, category: 'worries', nickname: 'famous', image: 'https://www.collinsdictionary.com/images/full/freesia_183445007.jpg', title: 'title', content: 'main text10', likes: 6, comments: 1, date: "2022.02.22" },
  { id: 13, category: 'worries', nickname: 'famous', image: 'https://www.collinsdictionary.com/images/full/freesia_183445007.jpg', title: 'title', content: 'main text10', likes: 6, comments: 1, date: "2022.02.22" },
]

const PostItem = ({ item }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.postView}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
    </TouchableOpacity>
  );
};

export default function MyChallengeList() {
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