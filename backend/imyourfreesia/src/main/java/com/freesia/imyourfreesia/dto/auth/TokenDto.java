package com.freesia.imyourfreesia.dto.auth;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {

    @ApiModelProperty(example = "토큰")
    private String token;

    @ApiModelProperty(example = "이메일")
    private String email;
}