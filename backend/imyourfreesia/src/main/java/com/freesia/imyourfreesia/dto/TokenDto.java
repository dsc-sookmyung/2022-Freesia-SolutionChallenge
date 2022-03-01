package com.freesia.imyourfreesia.dto;

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
}