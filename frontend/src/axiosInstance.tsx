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
    //const token = await AsyncStorage.getItem("token");
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnZHNjQGdtYWlsLmNvbSIsImV4cCI6MTY0Nzc1MjkzMSwiaWF0IjoxNjQ3NjY2NTMxfQ.vrEeTs4-t5TZTxqveujcOFd4QAQXTiRWmrG_8M5ONQ7HSqnuFr8loK1l3VfGSfazK01WHy_V9np2_lOGgS7Wkg";
    // config.headers["Content-Type"] = "application/json; charset=utf-8";
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
