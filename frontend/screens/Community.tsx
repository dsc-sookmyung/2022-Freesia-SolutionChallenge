import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";

export default function Map({ navigation }: any) {
  const { colors } = useTheme();

  return (
    <View>
      <Text style={{ color: colors.text }}>Community</Text>
    </View>
  );
}
