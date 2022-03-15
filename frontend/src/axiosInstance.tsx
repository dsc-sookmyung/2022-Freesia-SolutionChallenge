import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ipAddress } from "./CommonComponent";

// axios 패키지 대신 axiosInstance 사용
// api 요청할 때마다 토큰값 헤더에 넣어 처리

const axiosInstance = axios.create({
  baseURL: `http://${ipAddress}:8080`, // localhost 대신 본인 컴퓨터 ip(IPv4) 주소
});

axiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem("token");
    //config.headers["Content-Type"] = "application/json; charset=utf-8;";
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    config.headers["Boundary"] = "//";
    // config.headers["Content-Type"] =
    //  "multipart/form-data; boundary=someArbitraryUniqueString; charset=utf-8"; */
    /* config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "multipart/form-data;";
 */
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
