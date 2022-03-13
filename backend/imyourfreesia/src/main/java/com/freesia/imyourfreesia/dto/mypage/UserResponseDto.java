package com.freesia.imyourfreesia.dto.mypage;

import com.freesia.imyourfreesia.domain.user.User;
import lombok.Getter;

import javax.persistence.Column;

@Getter
public class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private String nickName;
    //private String profileImg;
    private String goalMsg;

    public UserResponseDto(User entity){
        this.id = entity.getId();
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.nickName = entity.getNickName();
        //this.filePath = filePath;
        this.goalMsg = entity.getGoalMsg();
    }
}
