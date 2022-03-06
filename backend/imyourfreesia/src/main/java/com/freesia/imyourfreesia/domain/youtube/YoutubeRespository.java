package com.freesia.imyourfreesia.domain.youtube;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface YoutubeRespository extends JpaRepository<Youtube, Long> {
    List<Youtube> findAll();
}
