package com.freesia.imyourfreesia.dto.mypage;

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
    private LocalDate createdDate;
    private LocalDate modifiedDate;
    private int days;


    //LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59));

    //System.out.printf("Days: " + period.getDays());

    public UserResponseDto(User entity){

        this.id = entity.getId();
        this.username = entity.getUsername();
        this.email = entity.getEmail();
        this.nickName = entity.getNickName();
        this.profileImg = entity.getProfileImg();
        this.goalMsg = entity.getGoalMsg();
        this.createdDate = entity.getCreatedDate();
        this.modifiedDate = entity.getModifiedDate();

        LocalDate startDatetime = LocalDate.now();
        Period period = Period.between(modifiedDate, startDatetime);
        this.days = period.getDays()+1;

    }
}
