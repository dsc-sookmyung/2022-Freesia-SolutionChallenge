import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Image,
} from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { theme } from "../../color";
import axiosInstance from "../../axiosInstance";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CommunityScreen({ navigation }: any) {
  const [token, setToken] = useState<string>("");
  AsyncStorage.getItem("token").then((response) => setToken(response));

  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState<string>("worries");
  //const [profileImg, setProfileImg] = useState<string>();

  const isFocused = useIsFocused();

  // 게시글 정보와 작성자 프로필 이미지 가져오기
  const getPostInfo = async () => {
    var postList: any[] = [];
    await axiosInstance
      .get(`/communities?category=${category}`)
      .then(function (response) {
        postList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    await Promise.all(
      postList.map(async (data) => {
        await axiosInstance
          .get(`/api/user/image?email=${data.email}`)
          .then(function (response) {
            data.profileImg = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      })
    ).then(() => setPosts(postList));
  };

  useEffect(() => {
    getPostInfo();
  }, [category, isFocused]);

  /*const getProfileImg = (email: string) => {
    axiosInstance
      .get(`/api/user/image?email=${email}`)
      .then(function (response) {
        setProfileImg(`data:image/png;base64,${response.data}`);
      })
      .catch(function (error) {
        console.log(error);
      });
    if (profileImg != null) {
      return (
        <Image
          source={{ uri: profileImg }}
          style={{ width: 30, height: 30, borderRadius: 15, marginRight: 5 }}
        />
      );
    } else {
      return <EvilIcons name="user" size={30} color="black" />;
    }
  };*/

  const gotoCreate = () => {
    if (!token) {
      Alert.alert("Warning", "You can use it after login.");
    } else {
      navigation.navigate("Create");
    }
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
                    {/* {getProfileImg(post.email)} */}
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 25,
                        elevation: 2,
                        marginRight: 5,
                      }}
                    >
                      <Image
                        source={{
                          uri: `data:image/png;base64,${post.profileImg}`,
                        }}
                        style={{ width: 30, height: 30, borderRadius: 15 }}
                      />
                    </View>
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
