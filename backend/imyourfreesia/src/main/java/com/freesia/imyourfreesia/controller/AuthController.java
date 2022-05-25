package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.auth.*;
import com.freesia.imyourfreesia.service.auth.AuthService;
import com.freesia.imyourfreesia.service.auth.EmailService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(tags={"Auth API"})
@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private final AuthService authService;
    private final EmailService emailService;
    private final UserRepository userRepository;

    @GetMapping("/health_check")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok().build();
    }

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

    @PostMapping("/sendAuthEmail")
    @ApiOperation(value = "회원 가입시 이메일 인증 코드 전송", notes = "이메일을 통해 인증 코드 전송")
    @ApiImplicitParam(name = "email", value = "이메일")
    public ResponseEntity<?> sendAuthEmail(@RequestParam String email) throws Exception {

        if (userRepository.findByEmail(email) == null) {
            String authCode = emailService.sendAuthMail(email);
            return ResponseEntity.ok(authCode);
        }

        else {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }
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
