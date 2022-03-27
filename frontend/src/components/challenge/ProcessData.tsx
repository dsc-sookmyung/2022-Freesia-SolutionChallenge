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

export default function ProcessData({ route, navigation }: any) {}
