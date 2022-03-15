package com.freesia.imyourfreesia.domain.cheering;

import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Cheering extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    private String myEmail; // 응원 누른 사람

    private String yourEmail; // 응원 받은 사람

    @Builder
    public Cheering(String myEmail, String yourEmail){
        this.myEmail = myEmail;
        this.yourEmail = yourEmail;
    }
}
