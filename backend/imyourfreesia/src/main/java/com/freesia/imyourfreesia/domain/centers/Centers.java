package com.freesia.imyourfreesia.domain.centers;

import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@ToString
@Getter
@NoArgsConstructor
@Entity
public class Centers extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String name;

    @Column(nullable = false)
    private String contact;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String address;

    @Column(length = 500)
    private String websiteUrl;

    @Builder
    public Centers(String name, String contact, String address, String websiteUrl){
        this.name = name;
        this.contact = contact;
        this.address = address;
        this.websiteUrl = websiteUrl;
    }

    public void update(String address) {
        this.address = address;
    }
}
