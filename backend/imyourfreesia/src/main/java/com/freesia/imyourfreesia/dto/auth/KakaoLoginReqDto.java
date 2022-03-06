package com.freesia.imyourfreesia.dto.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class KakaoLoginReqDto {

    private String accessToken;

    @Builder
    public KakaoLoginReqDto(String accessToken) {
        this.accessToken = accessToken;
    }
}
