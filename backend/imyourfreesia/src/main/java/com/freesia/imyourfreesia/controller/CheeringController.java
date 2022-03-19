package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.domain.cheering.Cheering;
import com.freesia.imyourfreesia.dto.cheering.CheeringSaveRequestDto;
import com.freesia.imyourfreesia.service.CheeringService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(tags={"Cheering API"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class CheeringController {
    private final CheeringService cheeringService;

    /* 응원 설정 */
    @ApiOperation(value="응원 설정", notes="응원 설정 API")
    @ApiImplicitParam(name = "CheeringSaveRequestDto", value = "응원 설정 Dto")
    @PostMapping("/cheering")
    public ResponseEntity<Cheering> Cheering(@RequestBody CheeringSaveRequestDto requestDto){
        return ResponseEntity.ok()
                .body(cheeringService.cheering(requestDto));
    }

    /* 응원 해제 */
    @ApiOperation(value="응원 해제", notes="응원 해제 API")
    @ApiImplicitParam(name = "id", value = "응원 id", example = "1")
    @DeleteMapping("/cheering")
    public ResponseEntity<?> UnCheering(@RequestParam Long id){
        cheeringService.unCheering(id);
        return ResponseEntity.noContent().build();
    }

    /* 응원 전체 개수 조회 */
    @ApiOperation(value="응원 전체 개수 조회", notes="응원 전체 개수 조회 API")
    @ApiImplicitParam(name = "userEmail", value = "조회할 유저 email")
    @GetMapping("/cheering/cnt")
    public Long countCheering(@RequestParam String userEmail){
        return cheeringService.countByYourEmail(userEmail);
    }


    /* 응원 일주일 개수 조회 */
    @ApiOperation(value="응원 일주일 개수 조회", notes="응원 일주일 개수 조회 API")
    @ApiImplicitParam(name = "userEmail", value = "조회할 유저 email")
    @GetMapping("/cheering/cnt/week")
    public Long countCheeringWeek(@RequestParam String userEmail) {
        return cheeringService.countByCreatedDateBetweenAndYourEmail(userEmail);
    }

    /* 응원 랭킹 Top 10 조회 */
    @ApiOperation(value="응원 랭킹 Top 10 조회", notes="응원 랭킹 Top 10 API")
    @GetMapping("/cheering/ranking")
    public List<Map.Entry<String, Long>> ranking() {
        return cheeringService.ranking();
    }
}
