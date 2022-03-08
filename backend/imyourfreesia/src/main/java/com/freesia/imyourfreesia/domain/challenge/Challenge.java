package com.freesia.imyourfreesia.domain.challenge;

import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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
    private String image;

    @Builder
    public Challenge(User uid, String title, String contents, String image){
        this.uid = uid;
        this.title = title;
        this.contents = contents;
        this.image = image;
    }

    public void setUid(User uid){
        this.uid = uid;
    }

    public void setImage(String image){
        this.image = image;
    }

    //public void update(String title, String contents, String image) {
    public Challenge update(String title, String contents) {
        this.title = title;
        this.contents = contents;
        //this.image = image;
        return this;
    }
}
