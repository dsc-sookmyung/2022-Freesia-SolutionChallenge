package com.freesia.imyourfreesia.service.auth;

import com.freesia.imyourfreesia.config.JwtTokenUtil;
import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.auth.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;
    private final GoogleService googleService;
    private final KakaoService kakaoService;
    private final NaverService naverService;

    public String googleLogin(String accessToken) {

        String jwt;

        GoogleLoginReqDto googleLoginReqDto = new GoogleLoginReqDto();

        GoogleOAuth2UserInfoDto googleOAuth2UserInfoDto = googleService.getUserInfoByAccessToken(accessToken);

        User user = userRepository.findByEmail(googleOAuth2UserInfoDto.getEmail());

        if(user == null) {
            user = User.builder()
                    .name(googleOAuth2UserInfoDto.getName())
                    .email(googleOAuth2UserInfoDto.getEmail())
                    .build();

            userRepository.save(user);
        }

        jwt = jwtTokenUtil.generateToken(user);
        return jwt;

    }

    public String kakaoLogin(String accessToken) {

        String jwt;

        KakaoLoginReqDto kakaoLoginReqDto = new KakaoLoginReqDto();

        KakaoOAuth2UserInfoDto kakaoOAuth2UserInfoDto = kakaoService.getUserInfoByAccessToken(accessToken);

        User user = userRepository.findByEmail(kakaoOAuth2UserInfoDto.getEmail());

        if(user == null) {
            user = User.builder()
                    .name(kakaoOAuth2UserInfoDto.getName())
                    .email(kakaoOAuth2UserInfoDto.getEmail())
                    .build();

            userRepository.save(user);
        }

        jwt = jwtTokenUtil.generateToken(user);
        return jwt;
    }

    public String naverLoin(String accessToken) {

        String jwt;

        NaverLoginReqDto naverLoginReqDto = new NaverLoginReqDto();

        NaverOAuth2UserInfoDto naverOAuth2UserInfoDto = naverService.getUserInfoByAccessToken(accessToken);

        User user = userRepository.findByEmail(naverOAuth2UserInfoDto.getEmail());

        if(user == null) {
            user = User.builder()
                    .name(naverOAuth2UserInfoDto.getName())
                    .email(naverOAuth2UserInfoDto.getEmail())
                    .build();

            userRepository.save(user);
        }

        jwt = jwtTokenUtil.generateToken(user);
        return jwt;
    }

}
