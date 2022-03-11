package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.comment.Comment;
import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.community.CommunityRepository;
import com.freesia.imyourfreesia.domain.likes.Likes;
import com.freesia.imyourfreesia.domain.likes.LikesRepository;
import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.likes.LikeSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class LikesService {
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;
    private final LikesRepository likesRepository;

    /* 좋아요 설정 */
    @Transactional
    public Likes likes(LikeSaveRequestDto requestDto){
        User user = userRepository.findByEmail(requestDto.getUid());
        Community community = communityRepository.findById(requestDto.getPid())
                .orElseThrow(IllegalArgumentException::new);

        Likes likes = new Likes();
        likes.setUid(user);
        likes.setPid(community);
        return likesRepository.save(likes);
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
    public List<Likes> findAllByPid(Long pid){
        Community community = communityRepository.findById(pid)
                .orElseThrow(IllegalArgumentException::new);
        return likesRepository.findAllByPid(community);
    }

    /* 좋아요 개수 조회 */
    @Transactional
    public Long countByPid(Long pid){
        Community community = communityRepository.findById(pid)
                .orElseThrow(IllegalArgumentException::new);
        return likesRepository.countByPid(community);
    }
}
