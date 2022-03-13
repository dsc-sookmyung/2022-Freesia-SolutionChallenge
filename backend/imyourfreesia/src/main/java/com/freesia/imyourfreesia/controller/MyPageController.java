package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.auth.GeneralAuthVO;
import com.freesia.imyourfreesia.dto.challenge.ChallengeListResponseDto;
import com.freesia.imyourfreesia.dto.comment.CommentUpdateRequestDto;
import com.freesia.imyourfreesia.dto.community.CommunityListResponseDto;
import com.freesia.imyourfreesia.dto.likes.LikesListResponseDto;
import com.freesia.imyourfreesia.dto.mypage.UserResponseDto;
import com.freesia.imyourfreesia.service.ChallengeService;
import com.freesia.imyourfreesia.service.CommunityService;
import com.freesia.imyourfreesia.service.LikesService;
import com.freesia.imyourfreesia.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags={"MyPage API"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MyPageController {
    private final ChallengeService challengeService;
    private final CommunityService communityService;
    private final LikesService likesService;
    private final UserService userService;

    /* 유저 정보 조회 */
    @GetMapping("/user")
    public ResponseEntity<UserResponseDto> loadUser(@RequestParam String email) throws Exception{
        return ResponseEntity.ok()
                .body(userService.findByEmail(email));
    }

    /* 유저 정보 수정
    @PutMapping("/user")
    public ResponseEntity<Long> updateUser(@RequestParam String email,
                                           GeneralAuthVO generalAuthVO)throws Exception{
        UserUpdateRequestDto requestDto =
                UserUpdateRequestDto.builder()
                        .nickName(generalAuthVO.getNickName())
                        .goalMsg(generalAuthVO.getGoalMsg())
                        .build();

        MultipartFile multipart = generalAuthVO.getProfileImg();

        return ResponseEntity.ok()
                .body(userService.update(email, requestDto).getId());
    }*/

    /* 마이페이지 챌린지 조회 */
    @GetMapping("/mypage/challenge")
    public ResponseEntity<List<ChallengeListResponseDto>> loadMyChallenge(@RequestParam String email) throws Exception{
       return ResponseEntity.ok()
               .body(challengeService.findByUid(email));
    }

    /* 마이페이지 커뮤니티 조회 */
    @GetMapping("/mypage/community")
    public ResponseEntity<List<CommunityListResponseDto>> loadMyCommunity(@RequestParam String email) throws Exception{
        return ResponseEntity.ok()
                .body(communityService.findByUid(email));
    }

    /* 마이페이지 북마크 조회 */
    @GetMapping("/mypage/bookmark")
    public ResponseEntity<List<LikesListResponseDto>> loadMyBookmark(@RequestParam String email) throws Exception{
        return ResponseEntity.ok()
                .body(likesService.findByUid(email));
    }

}
