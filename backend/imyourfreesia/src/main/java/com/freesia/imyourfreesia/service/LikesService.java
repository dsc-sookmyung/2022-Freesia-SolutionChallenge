package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.community.CommunityRepository;
import com.freesia.imyourfreesia.domain.community.Photo;
import com.freesia.imyourfreesia.domain.likes.Likes;
import com.freesia.imyourfreesia.domain.likes.LikesRepository;
import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.challenge.ChallengeListResponseDto;
import com.freesia.imyourfreesia.dto.community.CommunityListResponseDto;
import com.freesia.imyourfreesia.dto.likes.LikesListResponseDto;
import com.freesia.imyourfreesia.dto.likes.LikesSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class LikesService {
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;
    private final LikesRepository likesRepository;

    /* 좋아요 설정 */
    @Transactional
    public Long likes(LikesSaveRequestDto requestDto){
        User user = userRepository.findByEmail(requestDto.getUid());
        Community community = communityRepository.findById(requestDto.getPid())
                .orElseThrow(IllegalArgumentException::new);

        Likes likes = new Likes();
        likes.setUid(user);
        likes.setPid(community);

        List<Likes> likesList = new ArrayList<>();
        likesList.add(likes);

        if(!likesList.isEmpty()) {
            for(Likes like: likesList) {
                community.addLike(likesRepository.save(like));
            }
        }

        return likesRepository.save(likes).getId();
    }

    /* 좋아요 해제 */
    @Transactional
    public void unLikes(Long id){
        Likes likes = likesRepository.findById(id)
                .orElseThrow(IllegalArgumentException::new);
        likesRepository.delete(likes);
    }

    /* 좋아요 목록 조회 */
    @Transactional(readOnly = true)
    public List<LikesListResponseDto> findAllByPid(Long pid){
        Community community = communityRepository.findById(pid)
                .orElseThrow(IllegalArgumentException::new);

        return likesRepository.findAllByPid(community)
                .stream()
                .map(LikesListResponseDto::new)
                .collect(Collectors.toList());
    }

    /* 좋아요 개수 조회 */
    @Transactional
    public Long countByPid(Long pid){
        Community community = communityRepository.findById(pid)
                .orElseThrow(IllegalArgumentException::new);
        return likesRepository.countByPid(community);
    }

    /* 마이페이지 북마크 조회 */
    @Transactional(readOnly = true)
    public List<LikesListResponseDto> findByUid(String email){
        User user = userRepository.findByEmail(email);

        return likesRepository.findByUid(user)
                .stream()
                .map(LikesListResponseDto::new)
                .collect(Collectors.toList());
    }

}
