package com.freesia.imyourfreesia.domain.cheering;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;;

public interface CheeringRepository extends JpaRepository<Cheering, Long> {
    Long countByYourEmail(String userEmail);
    List<Cheering> findByMyEmail(String userEmail);
    Cheering findByMyEmailAndYourEmail(String myEmail, String yourEmail);
    //List<Cheering> findAllByCreatedDateBetweenAndYourEmail(LocalDateTime start, LocalDateTime end, String userEmail);
    Long countByCreatedDateBetweenAndYourEmail(LocalDate start, LocalDate end, String userEmail);
}
