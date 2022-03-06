package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.domain.centers.Centers;
import com.freesia.imyourfreesia.domain.centers.CentersRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags={"freesia Centers API"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CentersController {
    private final CentersRepository centersRepository;

    @GetMapping("/center")
    @ApiOperation(value = "지역 센터 정보 검색", notes = "지역 센터 정보 검색 API")
    @ApiImplicitParam(name = "address", value = "주소")
    public ResponseEntity<List<Centers>> searchCenter(@RequestParam String address) {

        return ResponseEntity.ok().body(centersRepository.findByAddressContains(address));

    }

    @GetMapping("/centers")
    @ApiOperation(value = "지역 센터 정보 전체 조회", notes = "지역 센터 전체 조회 API")
    public ResponseEntity<List<Centers>> totalCenter() {

        return ResponseEntity.ok().body(centersRepository.findAll());

    }

}