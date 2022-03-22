package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.dto.emoticon.EmoticonRequestDto;
import com.freesia.imyourfreesia.dto.emoticon.EmoticonResponseDto;
import com.freesia.imyourfreesia.service.EmoticonService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(tags={"Emoticon API"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
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

    // 글 아이디와 사용자에 따른 이모티콘 조회
    @GetMapping("/emoticon/my")
    @ApiOperation(value = "글 아이디와 사용자에 따른 이모티콘 조회", notes = "글 아이디와 사용자에 따른 이모티콘 조회 API")
    @ApiImplicitParams ({
            @ApiImplicitParam(name = "challengeId", value = "챌린지 게시글 id", dataType = "Long", paramType = "query", example = "1"),
            @ApiImplicitParam(name = "email", value = "사용자 이메일")
    })
    public EmoticonResponseDto findByChallengeIdAndUidAndEmoticonName(@RequestParam Long challengeId, @RequestParam String email) {
        return emoticonService.findByChallengeIdAndUidAndEmoticonName(challengeId, email);
    }

    // 글에 따른 이모티콘 갯수 조회
    @GetMapping("/emoticon/count")
    @ApiOperation(value = "글에 따른 이모티콘 갯수 조회", notes = "글에 따른 이모티콘 갯수 조회 API")
    public EmoticonResponseDto count(@RequestParam Long challengeId) throws Exception {
        return emoticonService.count(challengeId);
    }
}
