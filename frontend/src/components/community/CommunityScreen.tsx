import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons, AntDesign, EvilIcons } from "@expo/vector-icons";
import { theme } from "../../color";
import axiosInstance from "../../axiosInstance";
import { useIsFocused } from "@react-navigation/native";
// import { defaultFont as Text } from "../../CommonComponent";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function CommunityScreen({ navigation }: any) {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState<string>("worries");

  const isFocused = useIsFocused();
  useEffect(() => {
    axiosInstance
      .get(`/auth/communities?category=${category}`)
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [category, isFocused]);

  const gotoCreate = () => {
    navigation.navigate("Create");
  };

  const gotoDetail = (item) => {
    navigation.navigate("Detail", {
      id: item.id,
      category: item.category,
      nickName: item.nickName,
      title: item.title,
      content: item.content,
      createdDate: item.createdDate,
    });
  };

  return (
    <View style={styles.container}>
      {/* category */}
      <View style={styles.category}>
        <TouchableOpacity onPress={() => setCategory("worries")}>
          <Text
            style={{
              ...styles.categoryItem,
              color: category === "worries" ? "black" : theme.grey,
              borderBottomWidth: category === "worries" ? 3 : null,
            }}
          >
            worries
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory("review")}>
          <Text
            style={{
              ...styles.categoryItem,
              color: category === "review" ? "black" : theme.grey,
              borderBottomWidth: category === "review" ? 3 : null,
            }}
          >
            review
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory("gathering")}>
          <Text
            style={{
              ...styles.categoryItem,
              color: category === "gathering" ? "black" : theme.grey,
              borderBottomWidth: category === "gathering" ? 3 : null,
            }}
          >
            gathering
          </Text>
        </TouchableOpacity>
      </View>

      {/* list */}
      <ScrollView>
        {posts
          .slice(0)
          .reverse()
          .map((post, index) =>
            post.category === category ? (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => gotoDetail(post)}
                  style={styles.list}
                >
                  <View style={styles.nicknameArea}>
                    <EvilIcons name="user" size={30} color="black" />
                    <Text style={styles.nickname}>{post.nickName}</Text>
                  </View>
                  <View style={styles.contentArea}>
                    <Text numberOfLines={2}>{post.content}</Text>
                  </View>
                  <View>
                    <Text style={styles.date}>{post.createdDate}</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    width: "100%",
                    height: 5,
                    backgroundColor: theme.devideBg,
                  }}
                ></View>
              </View>
            ) : null
          )}
      </ScrollView>

      {/* add button */}
      <TouchableOpacity onPress={gotoCreate} style={styles.addBtn}>
        <Ionicons name="add-circle" size={65} color="#ffd25E" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  category: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    borderBottomColor: theme.devideBg,
    borderBottomWidth: 3,
  },
  categoryItem: {
    fontSize: 20,
    paddingVertical: 5,
  },
  addBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  list: {
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
  date: {
    color: "grey",
  },
});
