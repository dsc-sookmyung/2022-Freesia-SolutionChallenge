import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { theme } from "../../color";
import axiosInstance from "../../axiosInstance";
import { screenWidth } from "../../CommonComponent";

const numColumns = 3;

const PostItem = ({ item }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.postView}>
      <Image
        source={require("../../../assets/sample/sample8.jpg")}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default function UserProfileScreen({ route }: any) {
  const [profileImg, setProfileImg] = useState<string>();
  const [nickname, setNickname] = useState<string>();
  const [goalMsg, setGoalMsg] = useState<string>();
  const [days, setDays] = useState<number>();
  const [authorEmail, setAuthorEmail] = useState<string>(
    route.params.authorEmail
  );
  const [cheering, setCheering] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<String>("");
  const [cheeringId, setCheeringId] = useState();

  // 사용자 정보 조회
  const getUser = () => {
    axiosInstance
      .get(`/api/user?email=${authorEmail}`)
      .then(function (response) {
        setNickname(response.data.nickName);
        setGoalMsg(response.data.goalMsg);
        setDays(response.data.days);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getProfileImg = () => {
    axiosInstance
      .get(`/api/user/image?email=${authorEmail}`)
      .then(function (response) {
        setProfileImg(`data:image/png;base64,${response.data}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getUser();
    getProfileImg();
  }, []);

  const tabList = ["challenge", "community", "bookmark"];
  const [activeTab, setActiveTab] = useState(0);
  const changeTab = (tabIndex: number) => setActiveTab(tabIndex);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/api/mypage/${tabList[activeTab]}?email=${authorEmail}`)
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [activeTab]);

  const TabContent = () => {
    switch (tabList[activeTab]) {
      case "challenge":
        return (
          <View style={styles.innerContainer}>
            <FlatList
              data={posts}
              renderItem={PostItem}
              keyExtractor={(item) => item.id}
              numColumns={numColumns}
            />
          </View>
        );
        break;
      case "community":
        return (
          <ScrollView style={styles.innerContainer}>
            {posts
              .slice(0)
              .reverse()
              .map((post, index) => (
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
                  <View
                    style={{
                      width: "100%",
                      height: 2,
                      backgroundColor: theme.devideBg,
                    }}
                  ></View>
                </View>
              ))}
          </ScrollView>
        );
        break;
      case "bookmark":
        return (
          <ScrollView style={styles.innerContainer}>
            {posts
              .slice(0)
              .reverse()
              .map((post, index) => (
                <View key={index}>
                  <TouchableOpacity style={styles.list}>
                    <View>
                      <Text style={styles.category}>{post.pcategory}</Text>
                    </View>
                    <View style={styles.contentArea}>
                      <Text style={styles.title}>{post.ptitle}</Text>
                      <Text numberOfLines={2}>{post.pcontent}</Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: "100%",
                      height: 2,
                      backgroundColor: theme.devideBg,
                    }}
                  ></View>
                </View>
              ))}
          </ScrollView>
        );
        break;
    }
  };

  // 게시글 응원 관련 view
  const CheeringAuthor = () => (
    <TouchableOpacity
      onPress={() => {
        cheering ? deleteCheering() : postCheering();
      }}
    >
      <Text
        style={{
          ...styles.nicknameText,
          color: cheering ? "orange" : "lightgrey",
        }}
      >
        Cheering
      </Text>
    </TouchableOpacity>
  );

  function isCheeringId(element) {
    if (element.yourEmail == authorEmail) {
      return true;
    }
  }

  // 게시글 작성자 이메일로 cheering id 찾기
  const getCheeringId = () => {
    axiosInstance
      .get(`/api/cheering/mycheer/list?userEmail=${userEmail}`)
      .then(function (response) {
        const cheering = response.data.find(isCheeringId);
        setCheeringId(cheering.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // cheering 설정
  const postCheering = () => {
    axiosInstance
      .post(`/api/cheering`, { myEmail: userEmail, yourEmail: authorEmail })
      .then(function (response) {
        setCheering(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // cheering 취소
  const deleteCheering = () => {
    getCheeringId();
    axiosInstance
      .delete(`/api/cheering?id=${cheeringId}`)
      .then(function (response) {
        setCheering(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.profileArea}>
          <View style={styles.nicknameArea}>
            {profileImg ? (
              <Image
                source={{ uri: profileImg }}
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
            ) : (
              <EvilIcons name="user" size={70} color="black" />
            )}
            <Text style={styles.nickname}>
              {nickname == null ? "Loading" : nickname}
            </Text>
          </View>
          <CheeringAuthor />
        </View>
        <View style={styles.goalArea}>
          <Text>{goalMsg == null ? "Loading" : goalMsg}</Text>
          <Text style={styles.dday}>
            <Text style={{ color: "#FF4588" }}>+{days}</Text> days
          </Text>
        </View>
      </View>

      <View style={styles.myList}>
        <View style={styles.tab}>
          {tabList.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => changeTab(index)}
              activeOpacity={1}
            >
              <Text
                style={{
                  ...styles.tabName,
                  color: activeTab === index ? "black" : theme.grey,
                  borderBottomWidth: activeTab === index ? 2 : null,
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TabContent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  userInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  profileArea: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nicknameArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  nickname: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  goalArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dday: {
    fontWeight: "bold",
  },
  myList: {
    flex: 3,
  },
  tab: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    borderTopColor: theme.devideBg,
    borderTopWidth: 2,
    borderBottomColor: theme.devideBg,
    borderBottomWidth: 2,
  },
  tabName: {
    fontSize: 16,
    paddingVertical: 7,
  },
  innerContainer: {
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
  nicknameText: {
    fontWeight: "700",
    fontSize: 18,
    marginLeft: 10,
  },
});
