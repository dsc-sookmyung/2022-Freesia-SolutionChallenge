package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.challenge.Challenge;
import com.freesia.imyourfreesia.domain.challenge.ChallengeRepository;
import com.freesia.imyourfreesia.domain.emoticon.Emoticon;
import com.freesia.imyourfreesia.domain.emoticon.EmoticonRepository;
import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.emoticon.EmoticonRequestDto;
import com.freesia.imyourfreesia.dto.emoticon.EmoticonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class EmoticonService {

    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;
    private final EmoticonRepository emoticonRepository;

    // 이모티콘 저장
    @Transactional
    public String save(EmoticonRequestDto emoticonRequestDto) {

        User user = userRepository.findByEmail(emoticonRequestDto.getEmail());
        Challenge challenge = challengeRepository.findById(emoticonRequestDto.getChallengeId()).orElseThrow(IllegalArgumentException::new);

        if (emoticonRepository.findByUidAndChallengeIdAndEmoticonName(user, challenge, emoticonRequestDto.getEmoticonName()).isEmpty()) {
            Emoticon emoticon = emoticonRequestDto.toEntity();
            emoticon.setUser(user);
            emoticon.setChallenge(challenge);

            emoticonRepository.save(emoticon);

            return "이모티콘 등록 완료. 이모티콘 아이디 : " + emoticonRepository.save(emoticon).getId();
        } else {
            return "이모티콘 등록 실패 (이미 존재합니다.)";
        }
    }

    // 이모티콘 삭제
    @Transactional
    public String delete(EmoticonRequestDto emoticonRequestDto) {

        User user = userRepository.findByEmail(emoticonRequestDto.getEmail());
        Challenge challenge = challengeRepository.findById(emoticonRequestDto.getChallengeId()).orElseThrow(IllegalArgumentException::new);

        if (emoticonRepository.findByUidAndChallengeIdAndEmoticonName(user, challenge, emoticonRequestDto.getEmoticonName()).isEmpty()) {

            return "삭제 실패 (존재하지 않습니다.)";
        } else {

            emoticonRepository.deleteByUidAndChallengeIdAndEmoticonName(user, challenge, emoticonRequestDto.getEmoticonName());

            return "삭제 완료";
        }
    }


    /* 글에 따른 이모티콘 갯수 조회
    @Transactional
    public EmoticonResponseDto count() {


        return
    }

     */

}
