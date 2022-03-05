package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.comment.Comment;
import com.freesia.imyourfreesia.domain.comment.CommentRepository;
import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.community.CommunityRepository;
import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.comment.CommentSaveRequestDto;
import com.freesia.imyourfreesia.dto.comment.CommentUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;
    private final CommentRepository commentRepository;

    /* 댓글 저장 */
    @Transactional
    public Comment save(CommentSaveRequestDto requestDto){
        //옵셔널이 아니라서 orElseThrow 처리x
        //옵셔널로 변경하면 로그인부분 건드려야 해서 일단 냅둠
        User user = userRepository.findByEmail(requestDto.getUid());
        Community community = communityRepository.findById(requestDto.getPid())
                .orElseThrow(IllegalArgumentException::new);

        Comment comment = requestDto.toEntity();
        comment.setUid(user);
        comment.setPid(community);
        return commentRepository.save(comment);
    }

    /* 댓글 조회 */
    @Transactional(readOnly = true)
    public List<Comment> findAllByPid(Long pid){
        Community community = communityRepository.findById(pid)
                .orElseThrow(IllegalArgumentException::new);
        return commentRepository.findAllByPid(community);
    }

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
