package com.freesia.imyourfreesia.dto.comment;

import com.freesia.imyourfreesia.domain.comment.Comment;
import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.Getter;

import javax.persistence.Column;
import java.time.LocalDate;

@Getter
public class CommentListResponseDto {
    private Long id;

    //private User uid;
    private Long uid;
    private String username;
    private String loginId;
    private String email;
    private String nickName;
    private String profileImg;

    private Long pid;
    private String content;
    private LocalDate createdDate;
    private LocalDate modifiedDate;

    public CommentListResponseDto(Comment entity){
        this.id = entity.getId();

        this.uid = entity.getUid().getId();
        this.username = entity.getUid().getUsername();
        this.loginId = entity.getUid().getLoginId();
        this.email = entity.getUid().getEmail();
        this.nickName = entity.getUid().getNickName();
        this.profileImg = entity.getUid().getProfileImg();

        this.pid = entity.getPid().getId();
        this.content = entity.getContent();
        this.createdDate = entity.getCreatedDate();
        this.modifiedDate = entity.getModifiedDate();
    }
}
