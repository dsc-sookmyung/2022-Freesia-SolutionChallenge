package com.freesia.imyourfreesia.dto.challenge;

import com.freesia.imyourfreesia.domain.challenge.Challenge;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ChallengeResponseDto {
    private Long id;
    private User uid;
    private String title;
    private String contents;
    //private List<Long> imageId;
    private List<Long> filePathId;
    private LocalDate createdDate;
    private LocalDate modifiedDate;
    // private String createdDate;
    // private String modifiedDate;


    public ChallengeResponseDto(Challenge entity, List<Long> filePath){
        this.id = entity.getId();
        this.uid = entity.getUid();
        this.title = entity.getTitle();
        this.contents = entity.getContents();
        //this.imageId = imageId;
        this.filePathId = filePath;
        this.createdDate =entity.getCreatedDate();
        this.modifiedDate = entity.getModifiedDate();
    }
}
