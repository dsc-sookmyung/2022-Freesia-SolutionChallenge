package com.freesia.imyourfreesia.dto.mypage;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserUpdateRequestDto {
    private String nickName;
    //private String profileImg;
    private String goalMsg;

    @Builder
    public UserUpdateRequestDto(String nickName, String profileImg, String goalMsg){
        this.nickName = nickName;
        //this.profileImg = profileImg;
        this.goalMsg = goalMsg;
    }
}
