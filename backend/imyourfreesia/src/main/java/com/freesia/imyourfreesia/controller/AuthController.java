package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.dto.auth.*;
import com.freesia.imyourfreesia.service.auth.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(tags={"freesia Auth API"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private final AuthService authService;

    @ApiOperation(value = "구글 회원가입/로그인 (사용 X / 포스트맨 이용)", notes = "구글 회원가입/로그인 API")
    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(SocialAuthVO socialAuthVO) throws Exception {

        GoogleLoginReqDto googleLoginReqDto =
                GoogleLoginReqDto.builder()
                        .accessToken(socialAuthVO.getAccessToken())
                        .nickName(socialAuthVO.getNickName())
                        .goalMsg(socialAuthVO.getGoalMsg())
                        .build();

        String token = authService.googleLogin(googleLoginReqDto, socialAuthVO.getProfileImg());

        return ResponseEntity.ok(new TokenDto(token));
    }

    @ApiOperation(value = "카카오 회원가입/로그인 (사용 X / 포스트맨 이용)", notes = "카카오 회원가입/로그인 API")
    @PostMapping("/kakao")
    public ResponseEntity<?> kakaoLogin(SocialAuthVO socialAuthVO) throws Exception {

        KakaoLoginReqDto kakaoLoginReqDto =
                KakaoLoginReqDto.builder()
                        .accessToken(socialAuthVO.getAccessToken())
                        .nickName(socialAuthVO.getNickName())
                        .goalMsg(socialAuthVO.getGoalMsg())
                        .build();

        String token = authService.kakaoLogin(kakaoLoginReqDto, socialAuthVO.getProfileImg());

        return ResponseEntity.ok(new TokenDto(token));
    }

    @ApiOperation(value = "네이버 회원가입/로그인 (사용 X / 포스트맨 이용)", notes = "네이버 회원가입/로그인 API")
    @PostMapping("/naver")
    public ResponseEntity<?> naverLogin(SocialAuthVO socialAuthVO) throws Exception {

        NaverLoginReqDto naverLoginReqDto =
                NaverLoginReqDto.builder()
                        .accessToken(socialAuthVO.getAccessToken())
                        .nickName(socialAuthVO.getNickName())
                        .goalMsg(socialAuthVO.getGoalMsg())
                        .build();

        String token = authService.naverLoin(naverLoginReqDto, socialAuthVO.getProfileImg());

        return ResponseEntity.ok(new TokenDto(token));
    }

    @ApiOperation(value = "일반 회원가입 (사용 X / 포스트맨 이용)", notes = "일반 회원가입 API")
    @PostMapping(value = "/generalJoin", consumes = {"multipart/form-data"})
    public ResponseEntity<?> generalJoin(GeneralAuthVO generalAuthVO) throws Exception {

        UserSaveRequestDto userSaveRequestDto =
                UserSaveRequestDto.builder()
                        .username(generalAuthVO.getUsername())
                        .loginId(generalAuthVO.getLoginId())
                        .password(generalAuthVO.getPassword())
                        .email(generalAuthVO.getEmail())
                        .nickName(generalAuthVO.getNickName())
                        .goalMsg(generalAuthVO.getGoalMsg())
                        .build();

        return ResponseEntity.ok(authService.generalJoin(userSaveRequestDto, generalAuthVO.getProfileImg()));
    }

    @ApiOperation(value = "일반 로그인", notes = "일반 로그인 API")
    @PostMapping("/generalLogin")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "loginId", value = "사용자 아이디"),
            @ApiImplicitParam(name = "password", value = "사용자 비밀번호")
    })
    public ResponseEntity<?> generalLogin(@RequestParam String loginId, String password) throws Exception {

        String token = authService.generalLogin(loginId, password);

        return ResponseEntity.ok(new TokenDto(token));
    }
}
