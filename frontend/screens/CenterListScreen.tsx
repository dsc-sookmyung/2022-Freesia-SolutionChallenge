import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";

export default function CenterListScreen({ navigation }: any) {
  const { colors } = useTheme();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: colors.text }}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
