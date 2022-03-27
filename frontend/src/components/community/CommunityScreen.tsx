import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons, AntDesign, EvilIcons } from "@expo/vector-icons";
import { theme } from "../../color";
import axiosInstance from "../../axiosInstance";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileIcon } from "../../CommonComponent";
// import { defaultFont as Text } from "../../CommonComponent";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function CommunityScreen({ navigation }: any) {
  const [token, setToken] = useState<string>("");
  AsyncStorage.getItem("token").then((response) => setToken(response));

  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState<string>("worries");
  const [authohrProfileImg, setAuthorProfileImg] = useState(null);

  const getAuthorProfile = () => {
    /* var imagePath;
    axiosInstance
      .get(`/api/user/image?email=${email.email}`)
      .then(function (response) {
        imagePath = `data:image/png;base64,${response.data}`;
      })
      .catch(function (error) {
        console.log(error);
      }); */
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    axiosInstance
      .get(`/communities?category=${category}`)
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    getAuthorProfile();
  }, [category, isFocused]);

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

  const UserIcon = (userEmail) => {
    var imagePath = null;
    axiosInstance
      .get(`/api/user/image?email=${userEmail.userEmail}`)
      .then(function (response) {
        imagePath = `data:image/png;base64,${response.data}`;
        setAuthorProfileImg(`data:image/png;base64,${response.data}`);
      })
      .catch(function (error) {
        console.log(error);
      });

    return <ProfileIcon imagePath={imagePath} size={30} />;
  };

  {
    /* const UserIcon = async (userEmail) => {
    const imagePath = await getUserProfileImage(userEmail);
    console.log(imagePath);
    return <View></View>;
  }; */
  }

  return (
    <View style={styles.container}>
      {/* category */}
      <View style={styles.category}>
        <TouchableOpacity
          style={{ width: "30%", justifyContent: "center" }}
          onPress={() => setCategory("worries")}
        >
          <Text
            style={{
              ...styles.categoryItem,
              color: category === "worries" ? "black" : theme.grey,
              borderBottomWidth: category === "worries" ? 3 : null,
            }}
          >
            Concern
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "30%" }}
          onPress={() => setCategory("review")}
        >
          <Text
            style={{
              ...styles.categoryItem,
              color: category === "review" ? "black" : theme.grey,
              borderBottomWidth: category === "review" ? 3 : null,
            }}
          >
            Review
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "30%" }}
          onPress={() => setCategory("gathering")}
        >
          <Text
            style={{
              ...styles.categoryItem,
              color: category === "gathering" ? "black" : theme.grey,
              borderBottomWidth: category === "gathering" ? 3 : null,
            }}
          >
            Gather
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
                    <UserIcon userEmail={post.email} />
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
    paddingTop: 8,
    borderBottomColor: theme.devideBg,
    borderBottomWidth: 1.5,
  },
  categoryItem: {
    textAlign: "center",
    width: "100%",
    fontSize: 20,
    paddingBottom: 8,
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
    paddingTop: 20,
    color: "grey",
  },
});
