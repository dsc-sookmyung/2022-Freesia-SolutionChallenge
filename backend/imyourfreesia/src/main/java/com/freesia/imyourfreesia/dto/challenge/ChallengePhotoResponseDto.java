package com.freesia.imyourfreesia.dto.challenge;

import com.freesia.imyourfreesia.domain.challenge.ChallengePhoto;
import lombok.Getter;

@Getter
public class ChallengePhotoResponseDto {
    private Long imageId;

    public ChallengePhotoResponseDto(ChallengePhoto entity){

        this.imageId = entity.getId();
    }
}
