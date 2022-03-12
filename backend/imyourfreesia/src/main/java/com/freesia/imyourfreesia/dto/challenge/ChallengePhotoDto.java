package com.freesia.imyourfreesia.dto.challenge;

import com.freesia.imyourfreesia.domain.challenge.ChallengePhoto;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ChallengePhotoDto {
    private String origFileName;
    private String filePath;
    private Long fileSize;

    @Builder
    public ChallengePhotoDto(String origFileName, String filePath, Long fileSize){
        this.origFileName = origFileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    public ChallengePhotoDto(ChallengePhoto entity){
        this.origFileName=entity.getOrigFileName();
        this.filePath=entity.getFilePath();
        this.fileSize=entity.getFileSize();
    }
}
