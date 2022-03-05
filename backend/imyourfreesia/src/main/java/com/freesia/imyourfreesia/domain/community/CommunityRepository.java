package com.freesia.imyourfreesia.domain.community;

import com.freesia.imyourfreesia.domain.centers.Centers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Centers, Long> {
}
