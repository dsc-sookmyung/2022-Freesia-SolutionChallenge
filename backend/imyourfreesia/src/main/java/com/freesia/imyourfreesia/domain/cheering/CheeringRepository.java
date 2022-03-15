package com.freesia.imyourfreesia.domain.cheering;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;;

public interface CheeringRepository extends JpaRepository<Cheering, Long> {
    Long countByYourEmail(String userEmail);
    //List<Cheering> findAllByCreatedDateBetweenAndYourEmail(LocalDateTime start, LocalDateTime end, String userEmail);
    Long countByCreatedDateBetweenAndYourEmail(LocalDate start, LocalDate end, String userEmail);
}
