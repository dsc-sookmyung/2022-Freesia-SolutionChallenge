package com.freesia.imyourfreesia.domain.community;

import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.*;

import javax.persistence.*;

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

    private String image;

    @Column(nullable = false)
    private String category;

    @Builder
    public Community(User uid, String title, String content, String image, String category){
        this.uid = uid;
        this.title = title;
        this.content = content;
        this.image = image;
        this.category = category;
    }

    public void update(String title, String content, String image, String category) {
        this.title = title;
        this.content = content;
        this.image = image;
        this.category = category;
    }
}
