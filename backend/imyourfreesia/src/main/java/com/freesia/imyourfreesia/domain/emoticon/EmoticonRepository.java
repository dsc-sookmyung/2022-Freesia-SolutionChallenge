package com.freesia.imyourfreesia.domain.emoticon;

import com.freesia.imyourfreesia.domain.challenge.Challenge;
import com.freesia.imyourfreesia.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmoticonRepository extends JpaRepository<Emoticon,Long> {
    Optional<Emoticon> findByUidAndChallengeIdAndEmoticonName(User user, Challenge challenge, String emoticonName);
    Optional<Emoticon> deleteByUidAndChallengeIdAndEmoticonName(User user, Challenge challenge, String emoticonName);

}

