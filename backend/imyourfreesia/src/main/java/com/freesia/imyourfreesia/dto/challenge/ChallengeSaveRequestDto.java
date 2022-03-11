package com.freesia.imyourfreesia.dto.challenge;

import com.freesia.imyourfreesia.domain.challenge.Challenge;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChallengeSaveRequestDto {
    private String uid;
    private String title;
    private String contents;


    @Builder
    public ChallengeSaveRequestDto(String uid, String title, String contents){
        this.uid = uid;
        this.title = title;
        this.contents = contents;

    }

    public Challenge toEntity(){
        return Challenge.builder()
                .title(title)
                .contents(contents)
                .build();
    }
}
