package com.freesia.imyourfreesia.dto.community;

import com.freesia.imyourfreesia.domain.community.Photo;
import lombok.Getter;

@Getter
public class PhotoResponseDto {
    private Long fileId;

    public PhotoResponseDto(Photo photo){
        this.fileId = photo.getId();
    }
}