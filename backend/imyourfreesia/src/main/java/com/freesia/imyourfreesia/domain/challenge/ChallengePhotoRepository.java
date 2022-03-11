package com.freesia.imyourfreesia.domain.challenge;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengePhotoRepository extends JpaRepository<ChallengePhoto, Long> {
    List<ChallengePhoto> findAllByChallengeId(Long challengeId);
    List<ChallengePhoto> findByChallengeId(Long challengeId);
}
