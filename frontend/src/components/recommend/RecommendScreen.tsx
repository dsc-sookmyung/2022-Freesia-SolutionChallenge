import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

export default function RecommendScreen({ navigation }: any) {
  const screenFullWidth = Dimensions.get("window").width;

  const videoData = [
    {
      id: "0",
      imagePath: "../../../assets/youtube_image.png",
      title:
        "#재취업 #경력단절 / 경력단절 여성, 재취업 가능할까요? [유수연의 핵사이다 고민상담]",
    },
    {
      id: "1",
      imagePath: "../../../assets/youtube_image.png",
      title:
        "#재취업 #경력단절 / 경력단절 여성, 재취업 가능할까요? [유수연의 핵사이다 고민상담]",
    },
    {
      id: "2",
      imagePath: "../../../assets/youtube_image.png",
      title:
        "#재취업 #경력단절 / 경력단절 여성, 재취업 가능할까요? [유수연의 핵사이다 고민상담]",
    },
    {
      id: "3",
      imagePath: "../../../assets/youtube_image.png",
      title:
        "#재취업 #경력단절 / 경력단절 여성, 재취업 가능할까요? [유수연의 핵사이다 고민상담]",
    },
  ];

  const VideoContent = ({ item }) => (
    <TouchableOpacity>
      <Image
        style={{
          width: screenFullWidth,
          height: (screenFullWidth * 720) / 1280,
        }}
        source={require("../../../assets/youtube_image.png")}
      ></Image>
      <Text style={{ height: 50, padding: 6 }}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={videoData}
        renderItem={VideoContent}
        keyExtractor={(v) => v.id}
      />
    </View>
  );
}
