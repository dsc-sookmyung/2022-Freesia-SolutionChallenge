package com.freesia.imyourfreesia.dto.challenge;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChallengeUpdateRequestDto {
    private String title;
    private String contents;

    @Builder
    public ChallengeUpdateRequestDto(String title, String contents){
        this.title = title;
        this.contents = contents;
    }
}
