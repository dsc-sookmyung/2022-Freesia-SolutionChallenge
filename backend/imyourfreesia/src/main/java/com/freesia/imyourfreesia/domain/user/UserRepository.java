package com.freesia.imyourfreesia.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByLoginIdAndPassword(String loginId, String password);
    Optional<User> findOneWithAuthoritiesByEmail(String email);
    // List<User> findAllByEmail();

    //@Query("SELECT email FROM User")
    List<User> findAll();
}
