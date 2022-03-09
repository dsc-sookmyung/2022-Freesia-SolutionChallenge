package com.freesia.imyourfreesia.domain.emoticon;

import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import com.freesia.imyourfreesia.domain.challenge.Challenge;
import com.freesia.imyourfreesia.domain.comment.Comment;
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
public class Emoticon extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @ManyToOne
    @JoinColumn (name = "uid")
    private User uid;

    @ManyToOne
    @JoinColumn (name = "challengeId")
    private Challenge challenge;

    @Column(nullable = false)
    private String emoticon;

    @Builder
    public Emoticon(User uid, Challenge challenge, String emoticon){
        this.uid = uid;
        this.challenge = challenge;
        this.emoticon = emoticon;
    }

    public void setUid(User uid){
        this.uid = uid;
    }

    public void setChallenge(Challenge challenge){
        this.challenge = challenge;
    }
}

