import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, FlatList, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { BASE_URL } from "../../CommonComponent";

const height = Dimensions.get("window").height;

export default function RecommendScreen() {
  const [youtubeData, setYoutubeData] = useState([]);

  // 백에서 유튜브 영상 데이터 받기
  const getYoutubeData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/youtube`, {
        method: "GET",
      });
      const json = await response.json();
      setYoutubeData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getYoutubeData();
  }, []);

  // 유튜브 영상 View
  const YoutubeContent = ({ item }) => (
    <View>
      <YoutubePlayer videoId={item.videoId} play={false} height={200} />
      <View style={style.youtubePlayer}>
        <Text style={style.youtubeTitle}>{item.title}</Text>
        <Text style={style.youtubeDate}>{item.createdDate}</Text>
      </View>
    </View>
  );

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  return (
    <View>
      <FlatList
        data={youtubeData}
        viewabilityConfig={viewConfigRef.current}
        renderItem={YoutubeContent}
        keyExtractor={(c) => c.id}
      />
    </View>
  );
}

const style = StyleSheet.create({
  youtubePlayer: {
    justifyContent: "space-between",
    height: height * 0.1,
    marginBottom: 8,
  },
  youtubeTitle: { padding: 6, fontSize: 16, fontWeight: "700" },
  youtubeDate: { padding: 6, fontSize: 12, color: "grey" },
});
