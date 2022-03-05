package com.freesia.imyourfreesia.dto.likes;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LikeSaveRequestDto {
    private String uid;
    private Long pid;

    @Builder
    public LikeSaveRequestDto(String uid, Long pid){
        this.uid = uid;
        this.pid = pid;
    }

    /*
    public Likes toEntity(){
        return Comment.builder()
                .build();
    }*/
}
