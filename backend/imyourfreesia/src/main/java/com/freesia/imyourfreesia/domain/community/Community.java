package com.freesia.imyourfreesia.domain.community;

import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Community extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "communityId")
    private Long id;

    @ManyToOne
    @JoinColumn (name = "userId")
    private User uid;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @OneToMany(mappedBy = "community", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    private List<Photo> image = new ArrayList<>();

    @Column(nullable = false)
    private String category;

    @Builder
    public Community(User uid, String title, String content, String category){
        this.uid = uid;
        this.title = title;
        this.content = content;
        this.category = category;
    }

    public Community update(String title, String content, String category) {
        this.title = title;
        this.content = content;
        this.category = category;
        return this;
    }

    public void setUser(User user) {
        this.uid = user;
    }

    public void addImage(Photo photo) {
        this.image.add(photo);

        if(photo.getCommunity() != this)
            photo.setCommunity(this);
    }
}
