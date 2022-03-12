package com.freesia.imyourfreesia.dto.auth;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@NoArgsConstructor
public class KakaoLoginReqDto {

    @ApiModelProperty(example = "액세스 토큰")
    @NotNull
    private String accessToken;

    @ApiModelProperty(example = "유저 닉네임")
    @NotNull
    @Size(min = 3, max = 100)
    private String nickName;

    @ApiModelProperty(example = "유저 목표")
    @NotNull
    @Size(min = 3, max = 100)
    private String goalMsg;

    @Builder
    public KakaoLoginReqDto(String accessToken, String nickName, String goalMsg) {
        this.accessToken = accessToken;
        this.nickName = nickName;
        this.goalMsg = goalMsg;
    }
}
