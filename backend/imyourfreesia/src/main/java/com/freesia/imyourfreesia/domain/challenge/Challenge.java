package com.freesia.imyourfreesia.domain.challenge;

import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import com.freesia.imyourfreesia.domain.emoticon.Emoticon;
import com.freesia.imyourfreesia.domain.likes.Likes;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Challenge extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challengeId")
    private Long id;

    @ManyToOne
    @JoinColumn (name = "uid")
    private User uid;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String contents;

    //@Column(nullable = false)
    @OneToMany(
            mappedBy = "challenge",
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            orphanRemoval = true
    )
    private List<ChallengePhoto> image = new ArrayList<>();

    @OneToMany(mappedBy = "challengeId", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    private List<Emoticon> emoticons = new ArrayList<>();

    @Builder
    public Challenge(User uid, String title, String contents){
        this.uid = uid;
        this.title = title;
        this.contents = contents;
    }

    public void setUid(User uid){
        this.uid = uid;
    }

    public Challenge update(String title, String contents) {
        this.title = title;
        this.contents = contents;
        return this;
    }

    public void addImage(ChallengePhoto challengePhoto){
        this.image.add(challengePhoto);

        if(challengePhoto.getChallenge() != this){
            challengePhoto.setChallenge(this);
        }
    }

    public void addEmoticon(Emoticon emoticon){
        this.emoticons.add(emoticon);

        if(emoticon.getChallengeId() != this){
            emoticon.setChallengeId(this);
        }
    }
}
