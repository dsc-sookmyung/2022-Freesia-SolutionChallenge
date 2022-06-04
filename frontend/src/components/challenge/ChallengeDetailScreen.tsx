import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider, ProfileIcon, mainStyle } from "../../CommonComponent";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axiosInstance from "../../axiosInstance";
import { useIsFocused } from "@react-navigation/native";
import Carousel, {
  ParallaxImage,
  Pagination,
} from "react-native-snap-carousel";

const SCREEN_WIDTH = Dimensions.get("window").width;

const emojiCollection = [
  {
    emoji: "😆",
    name: "emoticon1",
  },
  {
    emoji: "😍",
    name: "emoticon2",
  },
  {
    emoji: "🥳",
    name: "emoticon3",
  },
  {
    emoji: "👍",
    name: "emoticon4",
  },
  {
    emoji: "❤️",
    name: "emoticon5",
  },
];

export default function ChallengeDetail({ route, navigation }: any) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const challengeId = route.params.challengeId;
  const authorEmail = route.params.authorEmail;
  const [postData, setPostData] = useState({});
  const [cheering, setCheering] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<String>("");
  const [cheeringId, setCheeringId] = useState();
  const [emojiListShow, setEmojiListShow] = useState(false);
  const [emojiCount, setEmojiCount] = useState({});
  const [myEmojiCount, setMyEmojiCount] = useState({});
  const [emojiClicked, setEmojiClicked] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [postImg, setPostImg] = useState([]);
  const [index, setIndex] = useState(0);
  const [imgCount, setImgCount] = useState(0);
  const [profileImg, setProfileImg] = useState(null);
  AsyncStorage.getItem("token").then((response) => setToken(response));

  // 게시글 상세 정보 가져오기
  const getPostData = () => {
    axiosInstance
      .get(`/challenge?id=${challengeId}`)
      .then(function (response) {
        setPostData(response.data);
        setImgCount(response.data.filePathId.length);
        getPostImg(response.data.filePathId);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 게시글 이미지 가져오기
  const getPostImg = async (filePathId) => {
    var data: any[] = [];
    await Promise.all(
      filePathId.map(
        async (file, idx) =>
          await axiosInstance
            .get(`/challenge/image?id=${file}`)
            .then(function (response) {
              data = [...data, `data:image/png;base64,${response.data}`];
            })
            .catch(function (error) {
              console.log(error);
            })
      )
    ).then(() => setPostImg(data));
  };

  // 작성자 프로필 가져오기
  const getProfileImg = () => {
    axiosInstance
      .get(`/api/user/image?email=${authorEmail}`)
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
          style={{ width: 50, height: 50, borderRadius: 25, margin: 5 }}
        />
      );
    } else {
      return <ProfileIcon imagePath={null} size={50} />;
    }
  };

  // 현재 유저, 작성자 간 cheering 데이터 가져오기
  const getCheeringData = async () => {
    const email = await AsyncStorage.getItem("email");
    setUserEmail(email);
    axiosInstance
      .get(`/api/cheering/mycheer?myEmail=${email}&yourEmail=${authorEmail}`)
      .then(function (response) {
        setCheering(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 게시글의 이모티콘 데이터 가져오기
  const getEmojiData = () => {
    axiosInstance
      .get(`/emoticon/count?challengeId=${challengeId}`)
      .then(function (response) {
        setEmojiCount(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 게시글에 대한 사용자의 이모티콘 데이터 가져오기
  const getMyEmojiData = () => {
    axiosInstance
      .get(`/api/emoticon/my?challengeId=${challengeId}&email=${userEmail}`)
      .then(function (response) {
        setMyEmojiCount(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 내 이모지 선택여부 확인
  const checkMyEmoji = () => {
    const myEmojiData = Object.values(myEmojiCount);
    myEmojiData.map((data) => {
      data != 0 ? setEmojiClicked(true) : null;
    });
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    getPostData();
    getCheeringData();
    getProfileImg();
    getEmojiData();
    getMyEmojiData();
    checkMyEmoji();
    return;
  }, [isFocused]);

  // 챌린지 편집, 삭제 모달
  const handleEdit = () =>
    navigation.navigate("PostChallengeScreen", {
      postData,
      postImg,
      isCreate: false,
      isNew: false,
    });

  const handleDelete = () => {
    console.log("delete");
    axiosInstance
      .delete(`/api/challenge?id=${challengeId}`)
      .then(function (response) {
        navigation.navigate("ChallengeScreen");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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

  // 이모티콘 등록
  const postEmoji = (emojiName) => {
    let emojiCountSample = emojiCount;
    let myEmojiCountSample = myEmojiCount;

    emojiCountSample[emojiName]++;
    myEmojiCountSample[emojiName] = 1;
    setEmojiCount(emojiCountSample);
    setMyEmojiCount(myEmojiCountSample);
    setEmojiListShow(false);

    axiosInstance
      .post(`/api/emoticon`, {
        challengeId: challengeId,
        email: userEmail,
        emoticonName: emojiName,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 이모티콘 삭제
  const deleteEmoji = (emojiName) => {
    let emojiCountSample = emojiCount;
    let myEmojiCountSample = myEmojiCount;

    emojiCountSample[emojiName]--;
    myEmojiCountSample[emojiName] = 0;
    setEmojiCount(emojiCountSample);
    setMyEmojiCount(myEmojiCountSample);
    setEmojiListShow(false);

    axiosInstance
      .delete(`/api/emoticon`, {
        data: {
          challengeId: challengeId,
          email: userEmail,
          emoticonName: emojiName,
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 이모티콘 클릭 시 설정
  const handleEmojiClicked = (emoji) => {
    let emojiName = emoji.name;
    setEmojiClicked(true);
    myEmojiCount[emojiName] > 0 ? deleteEmoji(emojiName) : postEmoji(emojiName);
  };

  // 이모티콘 관련 view
  const EmojiContainer = () => {
    return (
      <View style={styles.emojiContainer}>
        <TouchableOpacity onPress={() => setEmojiListShow(!emojiListShow)}>
          <Ionicons
            style={{ marginLeft: 10, paddingTop: 5 }}
            name="md-heart-sharp"
            size={24}
            color={emojiClicked ? "red" : "lightgrey"}
          />
        </TouchableOpacity>
        {emojiListShow ? (
          <View style={styles.emojiList}>
            {emojiCollection.map((emoji, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleEmojiClicked(emoji)}
              >
                <Text style={{ fontSize: 24, marginHorizontal: 5 }}>
                  {emoji.emoji}
                </Text>
                {myEmojiCount[emoji.name] > 0 ? (
                  <View style={styles.emojiHide}></View>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </View>
    );
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

  // 종류별 이모지 개수 표시
  const ShowEmojiCount = () => (
    <View style={{ flexDirection: "row" }}>
      {emojiCollection.map((emoji, idx) =>
        emojiCount[emoji.name] == 0 ? null : (
          <View key={idx} style={styles.emojiView}>
            <Text>{emoji.emoji}</Text>
            <Text style={{ marginLeft: 5 }}>{emojiCount[emoji.name]}</Text>
          </View>
        )
      )}
    </View>
  );

  // 사용자 프로필
  const getUserProfile = () => {
    navigation.navigate("UserProfile", {
      authorEmail: authorEmail,
    });
  };

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

  const carouselRef = useRef(null);

  return (
    <ScrollView style={{ ...mainStyle.mainView, paddingHorizontal: 0 }}>
      <View style={styles.topBar}>
        <View style={styles.topProfile}>
          {getProfileImg()}
          <TouchableOpacity onPress={getUserProfile}>
            <Text style={styles.nicknameText}>
              {postData.uid == null ? null : postData.uid.nickName}
            </Text>
          </TouchableOpacity>
          <CheeringAuthor />
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="menu-outline" size={40} color="black" />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          statusBarTranslucent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <TouchableOpacity
            activeOpacity={0}
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.overlay}
          >
            <View style={styles.modalView}>
              <TouchableOpacity onPress={handleEdit}>
                <Text style={styles.modalText}>Edit</Text>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.modalText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
      <Carousel
        ref={carouselRef}
        sliderWidth={SCREEN_WIDTH}
        sliderHeight={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH}
        data={postImg}
        renderItem={renderItem}
        hasParallaxImages={true}
        onSnapToItem={(index) => setIndex(index)}
      />
      <Pagination
        dotsLength={imgCount}
        activeDotIndex={index}
        containerStyle={styles.dotContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <View style={styles.post}>
        <View style={styles.postTop}>
          <Text style={styles.postTitle}>{postData.title}</Text>
          {token ? (
            <View style={styles.emojiContainer}>
              <ShowEmojiCount />
              <EmojiContainer />
            </View>
          ) : null}
        </View>
        <Divider />
        <Text>{postData.contents}</Text>
        <Text style={styles.createdDate}>{postData.createdDate}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  topProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  nicknameText: {
    fontWeight: "700",
    fontSize: 18,
    marginLeft: 10,
  },
  detailImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  post: {
    margin: 10,
  },
  postTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  date: {
    color: "grey",
    marginTop: 20,
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
  postDate: {
    margin: 10,
    color: "grey",
    fontSize: 12,
  },
  createdDate: {
    marginTop: 30,
    fontSize: 10,
    color: "lightgrey",
  },
  emojiContainer: {
    flexDirection: "row",
    position: "relative",
  },
  emojiList: {
    position: "absolute",
    right: -5,
    bottom: 40,
    flexDirection: "row",
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
    elevation: 2,
  },
  emojiView: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 20,
    elevation: 2,
  },
  emojiHide: {
    position: "absolute",
    width: 36,
    height: 36,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  item: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  dotContainer: {},
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  inactiveDotStyle: {
    backgroundColor: "grey",
  },
});
