package com.freesia.imyourfreesia.domain.likes;

import com.freesia.imyourfreesia.domain.challenge.Challenge;
import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikesRepository extends JpaRepository<Likes,Long> {
    List<Likes> findAllByPid(Community pid);
    Long countByPid(Community pid);
    List<Likes> findByUid(User uid);
}
