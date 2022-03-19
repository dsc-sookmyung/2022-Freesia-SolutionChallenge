package com.freesia.imyourfreesia.dto.auth;

import com.freesia.imyourfreesia.domain.user.GoalMsg;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class UserSaveRequestDto {

    @ApiModelProperty(example = "유저 이름")
    @NotNull
    @Size(min = 3, max = 50)
    private String username;

    @ApiModelProperty(example = "유저 아이디")
    @Size(min = 3, max = 100)
    private String loginId;

    @ApiModelProperty(example = "유저 비밀번호")
    @Size(min = 3, max = 100)
    private String password;
    
    @ApiModelProperty(example = "유저 이메일")
    @NotNull
    @Size(min = 3, max = 100)
    private String email;

    @ApiModelProperty(example = "유저 닉네임")
    @Size(min = 3, max = 100)
    private String nickName;

    @ApiModelProperty(example = "유저 목표")
    @Size(min = 3, max = 100)
    private String goalMsg;

    @Builder
    public UserSaveRequestDto(String username, String loginId, String password, String email, String nickName, String goalMsg){
        this.username = username;
        this.loginId = loginId;
        this.password = password;
        this.email = email;
        this.nickName = nickName;
        this.goalMsg = goalMsg;
    }
}