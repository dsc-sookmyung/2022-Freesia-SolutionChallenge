package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.dto.community.CommunityResponseDto;
import com.freesia.imyourfreesia.dto.community.CommunitySaveRequestDto;
import com.freesia.imyourfreesia.dto.community.CommunityUpdateRequestDto;
import com.freesia.imyourfreesia.service.CommunityService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags={"freesia Community API"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CommunityController {

    private final CommunityService communityService;

    // 게시글 저장 - 사진 추가 코드 필요
    @ResponseBody
    @PostMapping("/community")
    @ApiOperation(value="커뮤니티 게시글 저장", notes="커뮤니티 게시글 저장 API")
    @ApiImplicitParam(name = "CommunitySaveRequestDto", value = "게시글 저장 dto")
    public ResponseEntity<Community> save(@RequestBody CommunitySaveRequestDto communitySaveRequestDto) throws Exception{
        return ResponseEntity.ok()
                .body(communityService.save(communitySaveRequestDto));
    }

    // 게시판 리스트 조회 (고민, 후기, 모임)
    @ResponseBody
    @GetMapping("/communities")
    @ApiOperation(value="커뮤니티 게시판 리스트 조회", notes="커뮤니티 게시판 리스트 조회 API")
    @ApiImplicitParam(name = "category", value = "카테고리명")
    public ResponseEntity<List<Community>> list(@RequestParam String category) throws Exception{
        return ResponseEntity.ok().body(communityService.list(category));
    }

    // 게시글 상세 조회
    @ResponseBody
    @GetMapping("/community")
    @ApiOperation(value="커뮤니티 상세 조회", notes="커뮤니티 상세 조회 API")
    @ApiImplicitParam(name = "id", value = "게시글 id")
    public ResponseEntity<CommunityResponseDto> view(@RequestParam Long id) throws Exception{
        return ResponseEntity.ok().body(communityService.findById(id));
    }

    // 게시글 수정 - 사진 수정 코드 필요
    @ResponseBody
    @PutMapping("/community")
    @ApiOperation(value="커뮤니티 수정", notes="게시글 수정 API")
    @ApiImplicitParam(name = "id", value = "게시글 id")
    public ResponseEntity<Community> update(@RequestParam Long id, @RequestBody CommunityUpdateRequestDto communityUpdateRequestDto){
        return ResponseEntity.ok().body(communityService.update(id, communityUpdateRequestDto));
    }

    // 게시글 삭제
    @ResponseBody
    @DeleteMapping("/community")
    @ApiOperation(value="커뮤니티 삭제", notes="게시글 삭제 API")
    @ApiImplicitParam(name = "id", value = "게시글 id")
    public ResponseEntity<?> delete(@RequestParam Long id){
        communityService.delete(id);
        return ResponseEntity.ok("게시글 "+id+"번 삭제 완료");
    }

    // 카테고리에 따른 내 게시글 가져오기
    @ResponseBody
    @GetMapping("/community/my")
    @ApiOperation(value="커뮤니티 내 글 조회", notes="커뮤니티 내 글 조회 API")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "email", value = "사용자 이메일"),
            @ApiImplicitParam(name = "category", value = "카테고리명"),
    })
    public ResponseEntity<List<Community>> my(@RequestParam String email, @RequestParam String category) throws Exception{
        return ResponseEntity.ok().body(communityService.findByEmail(email, category));
    }

}
