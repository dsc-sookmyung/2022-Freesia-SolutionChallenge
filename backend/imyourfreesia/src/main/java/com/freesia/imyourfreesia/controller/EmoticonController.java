package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.domain.emoticon.Emoticon;
import com.freesia.imyourfreesia.dto.emoticon.EmoticonRequestDto;
import com.freesia.imyourfreesia.dto.emoticon.EmoticonResponseDto;
import com.freesia.imyourfreesia.service.EmoticonService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags={"freesia Emoticon API"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EmoticonController {

    private final EmoticonService emoticonService;

    // 이모티콘 저장
    @PostMapping("/emoticon")
    @ApiOperation(value = "이모티콘 저장", notes = "이모티콘 저장 API")
    public String save(@RequestBody EmoticonRequestDto emoticonRequestDto) throws Exception {
        return emoticonService.save(emoticonRequestDto);
    }

    // 이모티콘 삭제
    @DeleteMapping("/emoticon")
    @ApiOperation(value="이모티콘 삭제", notes="이모티콘 삭제 API")
    public String delete(@RequestBody EmoticonRequestDto emoticonRequestDto) throws Exception {
        return emoticonService.delete(emoticonRequestDto);
    }

    // 글에 따른 이모티콘 갯수 조회
    @GetMapping("/emoticon")
    @ApiOperation(value = "글에 따른 이모티콘 갯수 조회", notes = "글에 따른 이모티콘 갯수 조회 API")
    public EmoticonResponseDto count(@RequestParam Long challengeId) throws Exception {
        return emoticonService.count(challengeId);
    }

    // 랭킹
    @GetMapping("/emoticon/ranking")
    @ApiOperation(value = "이번주 랭킹 Top10 조회", notes = "이번주 랭킹 Top10 조회 API")
    public List<Emoticon> ranking() throws Exception {
        return emoticonService.ranking();
    }
}
