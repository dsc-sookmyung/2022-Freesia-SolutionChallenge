package com.freesia.imyourfreesia.dto.auth;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class GoogleOAuth2UserInfoDto {

    private String name;
    private String email;
}