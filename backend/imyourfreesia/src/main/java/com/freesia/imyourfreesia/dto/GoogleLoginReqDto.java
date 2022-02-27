package com.freesia.imyourfreesia.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GoogleLoginReqDto {

    private String accessToken;

    @Builder
    public GoogleLoginReqDto(String accessToken) {
        this.accessToken = accessToken;
    }
}