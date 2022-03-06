package com.freesia.imyourfreesia.domain.youtube;

import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Youtube extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String videoId;

    @Column
    private String thumbnail;

    @Builder
    public Youtube(String title, String videoId, String thumbnail){
        this.title = title;
        this.videoId = videoId;
        this.thumbnail = thumbnail;
    }
}
