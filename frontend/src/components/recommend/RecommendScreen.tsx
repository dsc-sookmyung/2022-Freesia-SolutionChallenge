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
  const height = Dimensions.get("window").height;

  /* const youtubeData = async () => {
    try {
      const response = await fetch(
        `http://172.30.1.3:8080/api/center?address=${cityKr}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
    } catch (error) {
      console.error(error);
    }
  }; */

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
      <Text style={{ height: height * 0.08, padding: 6, fontSize: 12 }}>
        {item.title}
      </Text>
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
