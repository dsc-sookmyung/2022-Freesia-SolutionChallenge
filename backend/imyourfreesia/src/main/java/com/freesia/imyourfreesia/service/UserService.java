package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.user.GoalMsg;
import com.freesia.imyourfreesia.domain.user.GoalMsgRepository;
import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.mypage.GoalMsgUpdateRequestDto;
import com.freesia.imyourfreesia.dto.mypage.UserPasswordUpdateRequestDto;
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
    private final GoalMsgRepository goalMsgRepository;
    private final AuthService authService;

    /* 유저 정보 조회 */
    @Transactional(readOnly = true)
    public UserResponseDto findByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        GoalMsg goalMsg = goalMsgRepository.findByUserId(user);

        return new UserResponseDto(user, goalMsg);

    }

    /* 유저 정보 수정 */
    @Transactional
    public Long update(String email, UserUpdateRequestDto userUpdateRequestDto,
                       GoalMsgUpdateRequestDto goalMsgUpdateRequestDto, MultipartFile files) throws Exception{
        User user = userRepository.findByEmail(email);
        String profileImg = authService.convertImage(files);

        user.update(userUpdateRequestDto.getNickName(), profileImg);

        if(goalMsgRepository.findByUserId(user) != null) {
            GoalMsg goalMsg = goalMsgRepository.findByUserId(user);
            goalMsg.update(goalMsgUpdateRequestDto.getGoalMsg());
        }
        else {
            GoalMsg goalMsg = GoalMsg.builder()
                    .goalMsg(goalMsgUpdateRequestDto.getGoalMsg())
                    .build();

            goalMsg.setUserId(user);
            goalMsgRepository.save(goalMsg);
        }
        return user.getId();
    }

    /* 유저 비밀번호 수정 */
    @Transactional
    public Long updatePw(String email, UserPasswordUpdateRequestDto requestDto) throws Exception{
        User user = userRepository.findByEmail(email);

        user.pwUpdate(requestDto.getPassword());

        return user.getId();
    }
}

