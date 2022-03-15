package com.freesia.imyourfreesia.dto.auth;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class NaverLoginReqDto {

    @ApiModelProperty(example = "액세스 토큰")
    @NotNull
    private String accessToken;

    @Builder
    public NaverLoginReqDto(String accessToken) {
        this.accessToken = accessToken;
    }
}

