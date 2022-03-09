package com.freesia.imyourfreesia.dto.challenge;

import com.freesia.imyourfreesia.domain.challenge.Challenge;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.Getter;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
public class ChallengeResponseDto {
    private Long id;
    private User uid;
    private String title;
    private String contents;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    //private String image;

    public ChallengeResponseDto(Challenge entity){
        this.id = entity.getId();
        this.uid = entity.getUid();
        this.title = entity.getTitle();
        this.contents = entity.getContents();
        this.createdDate =entity.getCreatedDate();
        this.modifiedDate = entity.getModifiedDate();
    }
}
