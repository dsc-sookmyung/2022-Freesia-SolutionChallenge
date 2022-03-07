import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";

import YoutubePlayer from "react-native-youtube-iframe";

import { ipAddress } from "../../CommonComponent";

export default function RecommendScreen() {
  const height = Dimensions.get("window").height;
  const [youtubeData, setYoutubeData] = useState([]);

  const getYoutubeData = async () => {
    try {
      const response = await fetch(`http://${ipAddress}:8080/api/youtube`, {
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

  const YoutubeContent = ({ item }) => (
    <View>
      <YoutubePlayer videoId={item.videoId} play={false} height={200} />
      <View
        style={{
          justifyContent: "space-between",
          height: height * 0.1,
          marginBottom: 8,
        }}
      >
        <Text style={{ padding: 6, fontSize: 16 }}>{item.title}</Text>
        <Text style={{ padding: 6, fontSize: 12 }}>{item.createDate}</Text>
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

  {
    /*

    <Text style={{ padding: 6, fontSize: 12 }}>{youtubeData[0].title}</Text>
        <Text style={{ padding: 6, fontSize: 12 }}>
          {youtubeData[0].createDate}
        </Text>

    <FlatList
        data={youtubeData}
        viewabilityConfig={viewConfigRef.current}
        renderItem={YoutubeContent}
        keyExtractor={(c) => c.id}
      />
    
    <TouchableOpacity>
      <Image
        style={{
          width: screenFullWidth,
          height: (screenFullWidth * 720) / 1280,
        }}
        source={require("../../../assets/youtube_image.png")}
      ></Image>
      <Text style={{ height: height * 0.08, padding: 6, fontSize: 12 }}>
        {item.title}
      </Text>
    </TouchableOpacity> */
  }
}
