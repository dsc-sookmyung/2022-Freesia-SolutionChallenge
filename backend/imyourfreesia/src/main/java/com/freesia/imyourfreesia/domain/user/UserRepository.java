package com.freesia.imyourfreesia.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByLoginId(String loginId);
    Optional<User> findOneWithAuthoritiesByEmail(String email);

    List<User> findAll();
}
