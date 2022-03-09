package com.freesia.imyourfreesia.domain.challenge;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    @Query("SELECT c FROM Challenge c ORDER BY c.createdDate DESC")
    List<Challenge> findAllDesc();
}
