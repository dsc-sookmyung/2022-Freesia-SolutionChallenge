package com.freesia.imyourfreesia.dto.mypage;

import com.freesia.imyourfreesia.domain.user.GoalMsg;
import com.freesia.imyourfreesia.domain.user.User;
import javassist.bytecode.ByteArray;
import lombok.Getter;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.Period;

@Getter
public class UserResponseDto {
    private Long id;
    private String username;
    private String loginId;
    private String email;
    private String nickName;
    private String goalMsg;
    private LocalDate goalMsg_modifiedDate;
    private int days;

    public UserResponseDto(User entity, GoalMsg goalMsg) throws Exception {

        this.id = entity.getId();
        this.username = entity.getUsername();
        this.loginId = entity.getLoginId();
        this.email = entity.getEmail();
        this.nickName = entity.getNickName();

        if(goalMsg!=null){
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
}
