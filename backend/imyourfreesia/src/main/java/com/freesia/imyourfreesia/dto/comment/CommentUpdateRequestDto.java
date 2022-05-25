package com.freesia.imyourfreesia.dto.comment;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentUpdateRequestDto {
    private String content;
    private Long pid; // 게시글 id

    @Builder
    public CommentUpdateRequestDto(String content, Long pid){
        this.content = content;
        this.pid = pid;
    }
}
