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

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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


    // 글에 따른 이모티콘 갯수 조회
    @Transactional
    public EmoticonResponseDto count(Long challengeId) {

        EmoticonResponseDto emoticonResponseDto;

        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(IllegalArgumentException::new);

        // 이모티콘 이름 확정 시 변경 필요
        List<Emoticon> emoticon1List = emoticonRepository.findByChallengeIdAndEmoticonName(challenge, "emoticon1");
        List<Emoticon> emoticon2List = emoticonRepository.findByChallengeIdAndEmoticonName(challenge, "emoticon2");
        List<Emoticon> emoticon3List = emoticonRepository.findByChallengeIdAndEmoticonName(challenge, "emoticon3");
        List<Emoticon> emoticon4List = emoticonRepository.findByChallengeIdAndEmoticonName(challenge, "emoticon4");
        List<Emoticon> emoticon5List = emoticonRepository.findByChallengeIdAndEmoticonName(challenge, "emoticon5");

        return new EmoticonResponseDto(emoticon1List.size(), emoticon2List.size(), emoticon3List.size(), emoticon4List.size(), emoticon5List.size());
    }

    // 랭킹
    @Transactional
    public List<Emoticon> ranking() throws Exception {

        List<Emoticon> emoticonWeekList = findByCreatedDay();

        return emoticonWeekList;
    }

    // 이번주만 찾기
    @Transactional
    public List<Emoticon> findByCreatedDay() throws Exception {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy:MM:dd");
        DecimalFormat df = new DecimalFormat("00");
        Calendar currentCalendar = Calendar.getInstance();

        int year = currentCalendar.get(Calendar.YEAR);
        int month = currentCalendar.get(Calendar.MONTH)+1;
        String weekYear = Integer.toString(year);
        String weekMonth = Integer.toString(month);
        if (month < 10) {
            weekMonth = "0" + weekMonth;
        }

        // 이번주 첫째 날짜
        currentCalendar.add(Calendar.DATE, 2 - currentCalendar.get(Calendar.DAY_OF_WEEK));
        Date firstWeekDay = new Date(dateFormat.parse(weekYear+":"+weekMonth+":"+df.format(currentCalendar.get(Calendar.DATE))).getTime());
        System.out.println("firstWeekDay: "+firstWeekDay);

        // 이번달 마지막 날짜
        currentCalendar.add(Calendar.DATE, 8 - currentCalendar.get(Calendar.DAY_OF_WEEK));
        Date lastWeekDay = new Date(dateFormat.parse(weekYear+":"+weekMonth+":"+df.format(currentCalendar.get(Calendar.DATE))).getTime());
        System.out.println("lastWeekDay: "+lastWeekDay);

        List<Emoticon> emoticonAllList = emoticonRepository.findAll();
        List<Emoticon> emoticonWeekList = null;

        for(Emoticon emoticon: emoticonAllList) {
            Date createDay = new Date(dateFormat.parse(emoticon.getCreatedDate()).getTime());
            //Date createDay = new Date(dateFormat.parse(emoticon.getCreatedDate()).getTime());
            System.out.println("createDay: "+createDay);

            if(createDay.before(lastWeekDay) && createDay.after(firstWeekDay)) {
                emoticonWeekList.contains(emoticon); // 이번주에 생긴 이모티콘만 포함하는 리스트
            }
        }

        return emoticonWeekList;
    }
}
