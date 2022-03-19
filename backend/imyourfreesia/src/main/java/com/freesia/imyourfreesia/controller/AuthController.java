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

@Api(tags={"Auth API"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private final AuthService authService;

    @ApiOperation(value = "구글 로그인", notes = "구글 로그인 API")
    @PostMapping("/google")
    public TokenDto googleLogin(@RequestBody GoogleLoginReqDto googleLoginReqDto) throws Exception {
        return authService.googleLogin(googleLoginReqDto.getAccessToken());
    }

    @ApiOperation(value = "카카오 로그인", notes = "카카오 로그인 API")
    @PostMapping("/kakao")
    public TokenDto kakaoLogin(@RequestBody KakaoLoginReqDto kakaoLoginReqDto) {
        return authService.kakaoLogin(kakaoLoginReqDto.getAccessToken());
    }

    @ApiOperation(value = "네이버 로그인", notes = "네이버 로그인 API")
    @PostMapping("/naver")
    public TokenDto naverLogin(@RequestBody NaverLoginReqDto naverLoginReqDto) {
        return authService.naverLoin(naverLoginReqDto.getAccessToken());
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
    public TokenDto generalLogin(@RequestParam String loginId, String password) throws Exception {
        return authService.generalLogin(loginId, password);
    }
}
