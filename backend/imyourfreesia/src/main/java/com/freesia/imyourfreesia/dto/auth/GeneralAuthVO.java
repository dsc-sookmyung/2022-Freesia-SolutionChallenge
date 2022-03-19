package com.freesia.imyourfreesia.dto.auth;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class GeneralAuthVO {
    @ApiModelProperty(example = "유저 이름")
    @Size(min = 3, max = 50)
    private String username;

    @ApiModelProperty(example = "유저 아이디")
    @Size(min = 3, max = 100)
    private String loginId;

    @ApiModelProperty(example = "유저 비밀번호")
    @Size(min = 3, max = 100)
    private String password;

    @ApiModelProperty(example = "유저 이메일")
    @Size(min = 3, max = 100)
    private String email;

    @ApiModelProperty(example = "유저 닉네임")
    @NotNull
    @Size(min = 3, max = 100)
    private String nickName;

    @ApiModelProperty(example = "유저 프로필 이미지")
    @Size(min = 3, max = 100)
    private MultipartFile profileImg;

    @ApiModelProperty(example = "유저 목표")
    @Size(min = 3, max = 100)
    private String goalMsg;
}
