import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ChallengeScreen from "../components/challenge/ChallengeScreen";
import PostChallengeScreen from "../components/challenge/PostChallengeScreen";

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
      />
      <ChallengeStack.Screen
        name="PostChallengeScreen"
        component={PostChallengeScreen}
        options={{ title: "New Post" }}
      />
    </ChallengeStack.Navigator>
  );
}
