package com.freesia.imyourfreesia.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import com.freesia.imyourfreesia.domain.community.Community;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseTimeEntity {

    @JsonIgnore
    @Id
    @Column(name = "userId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String nickName;

    private String profileImg;

    @Column(length = 100)
    private String goalMsg;

    @OneToMany (mappedBy = "uid")
    private List<Community> community = new ArrayList<Community>();

    @Builder
    public User(String name, String email, String nickname, String profileImg, String goalMsg) {
        this.name = name;
        this.email = email;
        this.nickName = nickname;
        this.profileImg = profileImg;
        this.goalMsg = goalMsg;
    }

    public void update(String name) { // 자동 업데이트
        this.name = name;
    }
}