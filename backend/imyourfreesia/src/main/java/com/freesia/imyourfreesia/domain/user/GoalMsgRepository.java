package com.freesia.imyourfreesia.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalMsgRepository extends JpaRepository<GoalMsg, Long> {
    GoalMsg findByUserId(User user);
}
