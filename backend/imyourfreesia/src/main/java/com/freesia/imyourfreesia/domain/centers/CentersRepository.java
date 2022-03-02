package com.freesia.imyourfreesia.domain.centers;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CentersRepository extends JpaRepository<Centers, Long> {
    List<Centers> findByAddressContains(String address);
}