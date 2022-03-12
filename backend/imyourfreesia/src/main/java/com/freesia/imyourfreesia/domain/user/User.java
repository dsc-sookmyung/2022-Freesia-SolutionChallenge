package com.freesia.imyourfreesia.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

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

    private String username;

    @Column(unique = true)
    private String loginId;

    private String password;

    @Column(unique = true)
    private String email;

    private String nickName;

    private String profileImg;

    @Column(length = 100)
    private String goalMsg;

    private boolean activated;

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "userId", referencedColumnName = "userId")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;

    @Builder
    public User(String username, String loginId, String password, String email, String nickname, String profileImg, String goalMsg, boolean activated, Set<Authority> authorities) {
        this.username = username;
        this.loginId = loginId;
        this.password = password;
        this.email = email;
        this.nickName = nickname;
        this.profileImg = profileImg;
        this.goalMsg = goalMsg;
        this.activated = activated;
        this.authorities = authorities;
    }

    public void update(String username, String password, String nickName, String profileImg, String goalMsg) {
        this.username = username;
        this.password = password;
        this.nickName = nickName;
        this.profileImg = profileImg;
        this.goalMsg = goalMsg;
    }
}