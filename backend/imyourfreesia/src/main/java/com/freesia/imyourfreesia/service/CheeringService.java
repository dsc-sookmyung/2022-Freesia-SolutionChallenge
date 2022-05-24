package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.cheering.Cheering;
import com.freesia.imyourfreesia.domain.cheering.CheeringRepository;
import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.cheering.CheeringSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;
import java.util.*;

@RequiredArgsConstructor
@Service
public class CheeringService {

    private final CheeringRepository cheeringRepository;
    private final UserRepository userRepository;

    /* 응원 설정 */
    @Transactional
    public Cheering cheering(CheeringSaveRequestDto requestDto){
        return cheeringRepository.save(requestDto.toEntity());
    }

    /* 응원 해제 */
    @Transactional
    public void unCheering(Long id){
        Cheering cheering = cheeringRepository.findById(id)
                .orElseThrow(IllegalArgumentException::new);
        cheeringRepository.delete(cheering);
    }

    /* 응원 전체 갯수 조회 */
    @Transactional
    public Long countByYourEmail(String userEmail) {
        return cheeringRepository.countByYourEmail(userEmail);
    }

    /* 응원 랭킹 Top 10 조회 */
    @Transactional
    //public List<Map.Entry<String, Long>> ranking() {
    public List<Map<String, Object>> ranking() {

        List<User> userList = userRepository.findAll();

        //Map<String, Long> countList = new HashMap<>();
        List<Map<String, Object>> countList = new ArrayList<>();

        for(User user: userList) {
            //countList.put(user.getNickName(), countByCreatedDateBetweenAndYourEmail(user.getEmail()));
            //countList.put(user.getEmail(), countByCreatedDateBetweenAndYourEmail(user.getEmail()));
            Map<String, Object> map = new HashMap<>();

            map.put("email", user.getEmail());
            map.put("nickName", user.getNickName());
            map.put("cnt", countByCreatedDateBetweenAndYourEmail(user.getEmail()));

            countList.add(map);
        }

        //List<Map.Entry<String, Long>> ranking_list = new ArrayList<Map.Entry<String, Long>>(countList.entrySet());
        //List<Map.Entry<Object, Long>> ranking_list = new ArrayList<Map.Entry<Object, Long>>(countList.entrySet());

        /*Collections.sort(ranking_list, new Comparator<Map.Entry<String, Long>>() {
            public int compare(Map.Entry<String, Long> obj1, Map.Entry<String, Long> obj2) {
                return obj2.getValue().compareTo(obj1.getValue());
            }
        });*/
        Collections.sort(countList, new Comparator<Map<String, Object>>() {
            public int compare(Map<String, Object> obj1, Map<String, Object> obj2) {
                Long cnt1 = (Long) obj1.get("cnt");
                Long cnt2 = (Long) obj2.get("cnt");
                return cnt2.compareTo(cnt1);
            }
        });


        /*if(ranking_list.size() < 10){
            return ranking_list.subList(0, ranking_list.size());
        } else {
            return ranking_list.subList(0, 10);
        }*/
        if(countList.size() < 10){
            return countList.subList(0, countList.size());
        } else {
            return countList.subList(0, 10);
        }
    }

    /* 응원 일주일 갯수 조회 */
    @Transactional
    public Long countByCreatedDateBetweenAndYourEmail(String userEmail){
        //LocalDateTime startDatetime =  LocalDateTime.now();
        LocalDate startDatetime = LocalDate.now();
        LocalDate endDatetime = LocalDate.now().plusDays(7);

        System.out.println(startDatetime + "/" + endDatetime);

        return cheeringRepository.countByCreatedDateBetweenAndYourEmail(startDatetime, endDatetime, userEmail);
    }

    /* 내가 응원한 유저 아이디 조회 */
    @Transactional
    public List<Cheering> findByMyEmail(String userEmail){
        return cheeringRepository.findByMyEmail(userEmail);
    }

    /* 상대방 응원 여부 */
    @Transactional
    public Boolean findByMyEmailAndYourEmail(String myEmail, String yourEmail){
        Cheering cheering = cheeringRepository.findByMyEmailAndYourEmail(myEmail,yourEmail);
        if(cheering!=null){
            return true;
        }else{
            return false;
        }
    }
}
