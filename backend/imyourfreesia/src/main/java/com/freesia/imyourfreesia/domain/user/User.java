package com.freesia.imyourfreesia.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import com.freesia.imyourfreesia.domain.challenge.Challenge;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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

    /*@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "goalMsgId")
    //private String goalMsg;
    private GoalMsg goalMsg;*/

    private boolean activated;

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "userId", referencedColumnName = "userId")},
            inverseJoinColumns = {@JoinColumn(name = "authorityId", referencedColumnName = "authorityId")})
    private Set<Authority> authorities;

    @Builder
    public User(String username, String loginId, String password, String email, String nickName, String profileImg, boolean activated, Set<Authority> authorities){
        this.username = username;
        this.loginId = loginId;
        this.password = password;
        this.email = email;
        this.nickName = nickName;
        this.profileImg = profileImg;
        this.activated = activated;
        this.authorities = authorities;
        // this.goalMsg = goalMsg;
    }

    //public void update(String username, String password, String nickName, String profileImg, String goalMsg) {
    public User update(String nickName, String profileImg) {
        //this.username = username;
        //this.password = password;
        this.nickName = nickName;
        this.profileImg = profileImg;
        //this.goalMsg = goalMsg;
        return this;
    }
}