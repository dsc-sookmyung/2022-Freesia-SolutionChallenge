package com.freesia.imyourfreesia.dto.community;

import com.freesia.imyourfreesia.domain.community.Photo;
import lombok.Getter;

@Getter
public class PhotoResponseDto {
    private String filePath;

    public PhotoResponseDto(Photo photo){
        this.filePath = photo.getFilePath();
    }
}