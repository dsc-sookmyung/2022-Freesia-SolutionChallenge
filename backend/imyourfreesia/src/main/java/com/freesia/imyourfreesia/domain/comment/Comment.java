package com.freesia.imyourfreesia.domain.comment;

import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Comment extends BaseTimeEntity {

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

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Builder
    public Comment(User uid, Community pid, String content){
        this.uid = uid;
        this.pid = pid;
        this.content = content;
    }

    public void setUid(User uid){
        this.uid = uid;
    }

    public void setPid(Community pid){
        this.pid = pid;
    }

    public Comment update(String content){
        this.content=content;
        return this;
    }
}
