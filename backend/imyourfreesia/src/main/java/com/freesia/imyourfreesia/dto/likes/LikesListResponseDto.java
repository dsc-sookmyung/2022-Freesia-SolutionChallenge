package com.freesia.imyourfreesia.dto.likes;

import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.likes.Likes;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.Getter;

@Getter
public class LikesListResponseDto {
    private Long id;
    private User uid;
    private Long pid;

    public LikesListResponseDto(Likes entity){
        this.id = entity.getId();
        this.uid = entity.getUid();
        this.pid = entity.getPid().getId();
    }
}
