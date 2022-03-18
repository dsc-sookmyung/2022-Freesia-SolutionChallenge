package com.freesia.imyourfreesia.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoalMsg extends BaseTimeEntity {

    @JsonIgnore
    @Id
    @Column(name = "goalMsgId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn
    private User userId;

    @Column(length = 100)
    private String goalMsg;

    @Builder
    public GoalMsg(String goalMsg){
        this.goalMsg = goalMsg;
    }

    public void setUser(User user) {
        this.setUserId(user);
    }
    public void update(String goalMsg){
        this.goalMsg = goalMsg;
    }
}
