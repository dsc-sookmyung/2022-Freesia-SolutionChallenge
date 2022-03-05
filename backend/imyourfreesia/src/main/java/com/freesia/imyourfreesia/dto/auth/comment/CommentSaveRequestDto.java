package com.freesia.imyourfreesia.dto.auth.comment;

import com.freesia.imyourfreesia.domain.comment.Comment;
import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentSaveRequestDto {
    private String uid;
    private Long pid;
    private String content;

    @Builder
    public CommentSaveRequestDto(String uid, Long pid, String content){
        this.uid = uid;
        this.pid = pid;
        this.content = content;
    }

    public Comment toEntity(){
        return Comment.builder()
                .content(content)
                .build();
    }
}
