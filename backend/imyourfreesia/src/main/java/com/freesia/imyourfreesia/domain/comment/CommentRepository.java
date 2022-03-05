package com.freesia.imyourfreesia.domain.comment;

import com.freesia.imyourfreesia.domain.community.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findAllByPid(Community pid);
}
