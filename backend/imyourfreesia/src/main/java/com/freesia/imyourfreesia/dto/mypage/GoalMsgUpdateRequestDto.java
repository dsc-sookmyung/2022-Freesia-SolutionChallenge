package com.freesia.imyourfreesia.dto.mypage;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GoalMsgUpdateRequestDto {
    private String goalMsg;

    @Builder
    public GoalMsgUpdateRequestDto(String goalMsg){
        this.goalMsg = goalMsg;
    }
}
