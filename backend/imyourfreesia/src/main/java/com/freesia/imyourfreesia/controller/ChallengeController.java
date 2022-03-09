package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.domain.challenge.Challenge;
import com.freesia.imyourfreesia.dto.challenge.ChallengeListResponseDto;
import com.freesia.imyourfreesia.dto.challenge.ChallengeResponseDto;
import com.freesia.imyourfreesia.dto.challenge.ChallengeSaveRequestDto;
import com.freesia.imyourfreesia.dto.challenge.ChallengeUpdateRequestDto;
import com.freesia.imyourfreesia.service.ChallengeService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Api(tags={"Challenge API"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ChallengeController {
    private final ChallengeService challengeService;

    /* 챌린지 등록 */
    @PostMapping("/challenge")
    public ResponseEntity<Challenge> saveChallenge(@RequestBody ChallengeSaveRequestDto requestDto) throws Exception{
        return ResponseEntity.ok()
                .body(challengeService.save(requestDto));
    }

    /* 챌린지 리스트 조회 */
    @GetMapping("/challenge/list")
    public ResponseEntity<List<ChallengeListResponseDto>> loadChallenge() throws Exception {
        return ResponseEntity.ok()
                .body(challengeService.findAllDesc());
    }

    /* 챌린지 상세 조회 */
    @GetMapping("/challenge")
    public ResponseEntity<ChallengeResponseDto> loadChallengeDetail(@RequestParam Long id) throws Exception {
        return ResponseEntity.ok()
                .body(challengeService.findById(id));
    }

     /*챌린지 수정*/
    @PutMapping("/challenge")
    public ResponseEntity<Challenge> updateChallenge(@RequestParam Long id,
                                                               @RequestBody ChallengeUpdateRequestDto requestDto) throws Exception {
        return ResponseEntity.ok()
                .body(challengeService.updateChallenge(id, requestDto));
    }

    /* 챌린지 삭제 */
    @DeleteMapping("/challenge")
    public ResponseEntity<?> deleteChallenge(@RequestParam Long id){
        challengeService.deleteChallenge(id);
        return ResponseEntity.noContent().build();
    }

}
