package com.freesia.imyourfreesia.dto.mypage;

import com.freesia.imyourfreesia.domain.user.GoalMsg;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.Getter;

import java.time.LocalDate;
import java.time.Period;

@Getter
public class UserResponseDto {
    private Long id;
    private String username;
    private String email;
    private String nickName;
    private String profileImg;
    private String goalMsg;
    private LocalDate goalMsg_modifiedDate;
    private int days;

    public UserResponseDto(User entity, GoalMsg goalMsg){

        this.id = entity.getId();
        this.username = entity.getUsername();
        this.email = entity.getEmail();
        this.nickName = entity.getNickName();
        this.profileImg = entity.getProfileImg();

        this.goalMsg = goalMsg.getGoalMsg();
        this.goalMsg_modifiedDate = goalMsg.getModifiedDate();

        if(this.goalMsg == "") {
            this.days = 0;
        }
        else {
            LocalDate startDatetime = LocalDate.now();
            Period period = Period.between(goalMsg_modifiedDate, startDatetime);
            this.days = period.getDays()+1;
        }
    }
}
