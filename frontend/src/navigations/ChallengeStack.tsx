import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ChallengeScreen from "../components/challenge/ChallengeScreen";
import PostChallengeScreen from "../components/challenge/PostChallengeScreen";
import ChallengeDetailScreen from "../components/challenge/ChallengeDetailScreen";
import EditChallengeScreen from "../components/challenge/EditChallengeScreen";

import { theme } from "../color";

export default function ChallengeStackScreen() {
  const ChallengeStack = createStackNavigator();
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
        options={{ title: "New Post" }}
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
    </ChallengeStack.Navigator>
  );
}
