package com.freesia.imyourfreesia.dto.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NaverLoginReqDto {

    private String accessToken;

    @Builder
    public NaverLoginReqDto(String accessToken) {
        this.accessToken = accessToken;
    }
}

