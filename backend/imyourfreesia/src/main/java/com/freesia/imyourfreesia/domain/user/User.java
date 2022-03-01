package com.freesia.imyourfreesia.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseTimeEntity {

    @JsonIgnore
    @Id // PK
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 50, unique = true)
    private String name;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "nickName", length = 100)
    private String nickName;

    @Column(name = "profileImg", length = 100)
    private String profileImg;

    @Column(name = "goalMsg", length = 100)
    private String goalMsg;

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