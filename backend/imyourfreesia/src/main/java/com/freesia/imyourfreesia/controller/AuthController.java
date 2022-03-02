package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.dto.auth.GoogleLoginReqDto;
import com.freesia.imyourfreesia.dto.auth.KakaoLoginReqDto;
import com.freesia.imyourfreesia.dto.auth.NaverLoginReqDto;
import com.freesia.imyourfreesia.dto.auth.TokenDto;
import com.freesia.imyourfreesia.service.auth.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(tags={"freesia Auth API"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    @ApiOperation(value = "구글 로그인", notes = "구글 로그인 API")
    @ApiImplicitParam(name = "accessToken", value = "accessToken")
    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginReqDto googleLoginReqDto) {

        String token = authService.googleLogin(googleLoginReqDto.getAccessToken());

        return ResponseEntity.ok(new TokenDto(token));
    }

    @ApiOperation(value = "카카오 로그인", notes = "카카오 로그인 API")
    @ApiImplicitParam(name = "accessToken", value = "accessToken")
    @PostMapping("/kakao")
    public ResponseEntity<?> kakaoLogin(@RequestBody KakaoLoginReqDto kakaoLoginReqDto) {

        String token = authService.kakaoLogin(kakaoLoginReqDto.getAccessToken());

        return ResponseEntity.ok(new TokenDto(token));
    }

    @ApiOperation(value = "네이버 로그인", notes = "네이버 로그인 API")
    @ApiImplicitParam(name = "accessToken", value = "accessToken")
    @PostMapping("/naver")
    public ResponseEntity<?> naverLogin(@RequestBody NaverLoginReqDto naverLoginReqDto) {

        String token = authService.naverLoin(naverLoginReqDto.getAccessToken());

        return ResponseEntity.ok(new TokenDto(token));
    }
}
