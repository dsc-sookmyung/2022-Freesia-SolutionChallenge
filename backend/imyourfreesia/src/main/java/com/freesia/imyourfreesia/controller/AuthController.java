package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.dto.auth.GoogleLoginReqDto;
import com.freesia.imyourfreesia.dto.auth.KakaoLoginReqDto;
import com.freesia.imyourfreesia.dto.auth.NaverLoginReqDto;
import com.freesia.imyourfreesia.dto.auth.TokenDto;
import com.freesia.imyourfreesia.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginReqDto googleLoginReqDto) {

        String token = authService.googleLogin(googleLoginReqDto.getAccessToken());

        return ResponseEntity.ok(new TokenDto(token));
    }

    @PostMapping("/kakao")
    public ResponseEntity<?> kakaoLogin(@RequestBody KakaoLoginReqDto kakaoLoginReqDto) {

        String token = authService.kakaoLogin(kakaoLoginReqDto.getAccessToken());

        return ResponseEntity.ok(new TokenDto(token));
    }

    @PostMapping("/naver")
    public ResponseEntity<?> naverLogin(@RequestBody NaverLoginReqDto naverLoginReqDto) {

        String token = authService.naverLoin(naverLoginReqDto.getAccessToken());

        return ResponseEntity.ok(new TokenDto(token));
    }
}
