package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.mypage.UserResponseDto;
import com.freesia.imyourfreesia.dto.mypage.UserUpdateRequestDto;
import com.freesia.imyourfreesia.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final AuthService authService;

    /* 유저 정보 조회 */
    @Transactional(readOnly = true)
    public UserResponseDto findByEmail(String email){
        User user = userRepository.findByEmail(email);

        return new UserResponseDto(user);

    }

    /* 유저 정보 수정 */
    @Transactional
    public User update(String email, UserUpdateRequestDto requestDto, MultipartFile files) throws Exception{
        User user = userRepository.findByEmail(email);

        String profileImg = authService.convertImage(files);

        return user.update(requestDto.getNickName(), profileImg, requestDto.getGoalMsg());
    }
}
