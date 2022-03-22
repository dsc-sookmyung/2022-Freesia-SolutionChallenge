import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ChallengeScreen from "../components/challenge/ChallengeScreen";
import PostChallengeScreen from "../components/challenge/PostChallengeScreen";
import ChallengeDetailScreen from "../components/challenge/ChallengeDetailScreen";
import EditChallengeScreen from "../components/challenge/EditChallengeScreen";
import ImageBrowserScreen from "../components/challenge/ImageBrowserScreen";

import { theme } from "../color";

export default function ChallengeStackScreen() {
  const ChallengeStack = createStackNavigator();

  const GalleryBtn = () => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.navigate("ImageBrowser")}>
        <Ionicons name="camera" size={24} color="black" />
      </TouchableOpacity>
    );
  };
  return (
    <ChallengeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.headerBg,
        },
      }}
    >
      <ChallengeStack.Screen
        name="ChallengeScreen"
        component={ChallengeScreen}
        options={{ title: "Challenge" }}
      />
      <ChallengeStack.Screen
        name="PostChallengeScreen"
        component={PostChallengeScreen}
        options={{
          title: "New Post",
          headerRight: () => <GalleryBtn />,
          headerRightContainerStyle: { marginRight: 20 },
        }}
        initialParams={{ route: null }}
      />
      <ChallengeStack.Screen
        name="ChallengeDetailScreen"
        component={ChallengeDetailScreen}
        options={{ title: null }}
      />
      <ChallengeStack.Screen
        name="EditChallengeScreen"
        component={EditChallengeScreen}
        options={{ title: "Edit Post" }}
      />
      <ChallengeStack.Screen
        name="ImageBrowser"
        component={ImageBrowserScreen}
        options={{ title: null }}
      />
    </ChallengeStack.Navigator>
  );
}
