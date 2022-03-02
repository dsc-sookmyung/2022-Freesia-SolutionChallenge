package com.freesia.imyourfreesia.dto.auth;

import com.freesia.imyourfreesia.domain.user.User;
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
    private String name;

    @ApiModelProperty(example = "유저 이메일")
    @NotNull
    @Size(min = 3, max = 100)
    private String email;

    @Builder
    public UserSaveRequestDto(String name, String email){
        this.name = name;
        this.email = email;
    }

    public User toEntity(){
        return User.builder()
                .name(name)
                .email(email)
                .build();
    }
}