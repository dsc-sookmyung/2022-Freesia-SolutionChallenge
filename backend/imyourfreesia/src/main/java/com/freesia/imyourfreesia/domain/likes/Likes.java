package com.freesia.imyourfreesia.domain.likes;

import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Likes extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @ManyToOne
    @JoinColumn (name = "uid")
    private User uid;

    @ManyToOne
    @JoinColumn (name = "pid")
    private Community pid;

    @Builder
    public Likes(User uid, Community pid){
        this.uid = uid;
        this.pid = pid;
    }

    public void setUid(User uid){
        this.uid = uid;
    }

    public void setPid(Community pid){
        this.pid = pid;
    }
}
