package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.challenge.Challenge;
import com.freesia.imyourfreesia.domain.challenge.ChallengeRepository;
import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.challenge.ChallengeListResponseDto;
import com.freesia.imyourfreesia.dto.challenge.ChallengeResponseDto;
import com.freesia.imyourfreesia.dto.challenge.ChallengeSaveRequestDto;
import com.freesia.imyourfreesia.dto.challenge.ChallengeUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChallengeService {
    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;

    /* 챌린지 등록 */
    @Transactional
    public Challenge save(ChallengeSaveRequestDto requestDto){
        User user = userRepository.findByEmail(requestDto.getUid());

        Challenge challenge = requestDto.toEntity();
        challenge.setUid(user);
        return challengeRepository.save(challenge);
    }

    /* 챌린지 리스트 조회 */
    @Transactional(readOnly = true)
    public List<ChallengeListResponseDto> findAllDesc(){
        return challengeRepository.findAll()
                .stream()
                .map(ChallengeListResponseDto::new)
                .collect(Collectors.toList());
    }

    /* 챌린지 상세 조회 */
    @Transactional(readOnly = true)
    public ChallengeResponseDto findById(Long id){
        Challenge challenge = challengeRepository.findById(id)
                .orElseThrow(IllegalArgumentException::new);
        return new ChallengeResponseDto(challenge);
    }

    /* 챌린지 수정 */
    @Transactional
    public Challenge updateChallenge(Long id, ChallengeUpdateRequestDto requestDto){
        Challenge challenge = challengeRepository.findById(id)
                .orElseThrow(IllegalArgumentException::new);
        return challenge.update(requestDto.getTitle(),requestDto.getContents());
    }

    /* 챌린지 삭제 */
    @Transactional
    public void deleteChallenge(Long id){
        Challenge challenge = challengeRepository.findById(id)
                .orElseThrow(IllegalArgumentException::new);

        challengeRepository.delete(challenge);
    }
}
