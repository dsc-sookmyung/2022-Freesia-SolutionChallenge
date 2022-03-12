package com.freesia.imyourfreesia.dto.auth;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class SocialAuthVO {

    @ApiModelProperty(example = "액세스 토큰")
    @NotNull
    private String accessToken;

    @ApiModelProperty(example = "유저 닉네임")
    @NotNull
    @Size(min = 3, max = 100)
    private String nickName;

    @ApiModelProperty(example = "유저 프로필 이미지")
    @NotNull
    @Size(min = 3, max = 100)
    private MultipartFile profileImg;

    @ApiModelProperty(example = "유저 목표")
    @NotNull
    @Size(min = 3, max = 100)
    private String goalMsg;
}
