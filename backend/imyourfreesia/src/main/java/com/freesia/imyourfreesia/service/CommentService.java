package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.comment.Comment;
import com.freesia.imyourfreesia.domain.comment.CommentRepository;
import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.community.CommunityRepository;
import com.freesia.imyourfreesia.domain.likes.Likes;
import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.challenge.ChallengeListResponseDto;
import com.freesia.imyourfreesia.dto.comment.CommentListResponseDto;
import com.freesia.imyourfreesia.dto.comment.CommentSaveRequestDto;
import com.freesia.imyourfreesia.dto.comment.CommentUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;
    private final CommentRepository commentRepository;

    /* 댓글 저장 */
    @Transactional
    public List<CommentListResponseDto> save(CommentSaveRequestDto requestDto){
        User user = userRepository.findByEmail(requestDto.getUid());
        Community community = communityRepository.findById(requestDto.getPid())
                .orElseThrow(IllegalArgumentException::new);

        Comment comments = requestDto.toEntity();
        comments.setUid(user);
        comments.setPid(community);

        List<Comment> commentList = new ArrayList<>();
        commentList.add(comments);

        if(!commentList.isEmpty()) {
            for(Comment comment: commentList) {
                community.addComment(commentRepository.save(comments));
            }
        }

        return commentRepository.findAllByPid(community)
                .stream()
                .map(CommentListResponseDto::new)
                .collect(Collectors.toList());
    }

    /* 댓글 조회 */
    @Transactional(readOnly = true)
    public List<CommentListResponseDto> findAllByPid(Long pid){
        Community community = communityRepository.findById(pid)
                .orElseThrow(IllegalArgumentException::new);

        return commentRepository.findAllByPid(community)
                .stream()
                .map(CommentListResponseDto::new)
                .collect(Collectors.toList());
    }
    /*
    public List<Comment> findAllByPid(Long pid){
        Community community = communityRepository.findById(pid)
                .orElseThrow(IllegalArgumentException::new);
        return commentRepository.findAllByPid(community);
    }*/


    /* 댓글 수정 */
    @Transactional
    public Comment update(Long id, CommentUpdateRequestDto requestDto){
        Comment comment = commentRepository.findById(id)
                .orElseThrow(IllegalArgumentException::new);

        return comment.update(requestDto.getContent());
    }

    /* 댓글 삭제 */
    @Transactional
    public void delete(Long id){
        Comment comment = commentRepository.findById(id)
                .orElseThrow(IllegalArgumentException::new);

        commentRepository.delete(comment);
    }
}
