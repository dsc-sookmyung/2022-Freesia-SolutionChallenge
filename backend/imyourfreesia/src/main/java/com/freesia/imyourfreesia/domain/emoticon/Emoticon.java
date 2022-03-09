package com.freesia.imyourfreesia.domain.emoticon;

import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import com.freesia.imyourfreesia.domain.challenge.Challenge;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
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
    private Challenge challengeId;

    @Column(nullable = false)
    private String emoticonName;

    @Builder
    public Emoticon(User uid, Challenge challengeId, String emoticonName){
        this.uid = uid;
        this.challengeId = challengeId;
        this.emoticonName = emoticonName;
    }

    public void setUser(User user){
        this.uid = user;
    }

    public void setChallenge(Challenge challenge){
        this.challengeId = challenge;
    }
}

