package com.freesia.imyourfreesia.dto.mypage;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserPasswordUpdateRequestDto {
    private String password;

    @Builder
    public UserPasswordUpdateRequestDto(String password){
        this.password = password;
    }
}
