import * as Font from 'expo-font';

const getFonts = async () => {
  await Font.loadAsync({
    "SpoqaBold": require("../assets/fonts/SpoqaHanSansNeo-Bold.otf"),
    "SpoqaMedium": require("../assets/fonts/SpoqaHanSansNeo-Medium.otf"),
    "SpoqaRegular": require("../assets/fonts/SpoqaHanSansNeo-Regular.otf"),
    "SpoqaLight": require("../assets/fonts/SpoqaHanSansNeo-Light.otf"),
    "SpoqaThin": require("../assets/fonts/SpoqaHanSansNeo-Thin.otf"),
  });
};

export default getFonts;