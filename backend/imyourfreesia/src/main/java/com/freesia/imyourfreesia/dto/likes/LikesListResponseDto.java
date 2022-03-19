package com.freesia.imyourfreesia.dto.likes;

import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.community.Photo;
import com.freesia.imyourfreesia.domain.likes.Likes;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.Getter;

import java.util.List;

@Getter
public class LikesListResponseDto {
    private Long id;
    private Long uid;

    private Long pid;
    private String ptitle;
    private String pcontent;
    private String pcategory;

    public LikesListResponseDto(Likes entity){
        this.id = entity.getId();
        this.uid = entity.getUid().getId();
        this.pid = entity.getPid().getId();
        this.ptitle = entity.getPid().getTitle();
        this.pcontent = entity.getPid().getContent();
        this.pcategory = entity.getPid().getCategory();
    }
}
