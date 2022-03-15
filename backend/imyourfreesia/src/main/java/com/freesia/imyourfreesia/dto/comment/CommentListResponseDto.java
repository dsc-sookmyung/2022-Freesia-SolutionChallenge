package com.freesia.imyourfreesia.dto.comment;

import com.freesia.imyourfreesia.domain.comment.Comment;
import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CommentListResponseDto {
    private Long id;
    private User uid;
    private Long pid;
    private String content;
    private LocalDate createdDate;
    private LocalDate modifiedDate;

    public CommentListResponseDto(Comment entity){
        this.id = entity.getId();
        this.uid = entity.getUid();
        this.pid = entity.getPid().getId();
        this.content = entity.getContent();
        this.createdDate = entity.getCreatedDate();
        this.modifiedDate = entity.getModifiedDate();
    }
}
