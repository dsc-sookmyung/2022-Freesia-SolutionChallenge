package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.dto.comment.CommentListResponseDto;
import com.freesia.imyourfreesia.dto.comment.CommentSaveRequestDto;
import com.freesia.imyourfreesia.dto.comment.CommentUpdateRequestDto;
import com.freesia.imyourfreesia.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags={"Comment API"})
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    private final CommentService commentService;

    /* 댓글 등록 */
    @ApiOperation(value="댓글 등록", notes="댓글 등록 API")
    @ApiImplicitParam(name = "CommentSaveRequestDto", value = "댓글 등록 dto")
    @PostMapping("/api/comment")
    public ResponseEntity<Long> saveCmt(@RequestBody CommentSaveRequestDto requestDto){
        return ResponseEntity.ok()
                .body(commentService.save(requestDto));
    }

    /* 댓글 조회 */
    @ApiOperation(value="댓글 조회", notes="댓글 조회 API")
    @ApiImplicitParam(name = "pid", value = "게시글 id", dataType="Long", paramType="query", example = "1")
    @GetMapping("/comment")
    public ResponseEntity<List<CommentListResponseDto>> loadCmt(@RequestParam Long pid){
        return ResponseEntity.ok()
                .body(commentService.findAllByPid(pid));
    }

    /* 댓글 수정 */
    @ApiOperation(value="댓글 수정", notes="댓글 수정 API")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "댓글 id", dataType="Long", paramType="query", example = "1"),
            @ApiImplicitParam(name = "CommentUpdateRequestDto", value = "댓글 수정 Dto")
    })
    @PutMapping("/api/comment")
    public ResponseEntity<Long> updateCmt(@RequestParam Long id,
                                             @RequestBody CommentUpdateRequestDto requestDto){
        return ResponseEntity.ok()
                .body(commentService.update(id, requestDto).getId());
    }

    /* 댓글 삭제 */
    @ApiOperation(value="댓글 삭제", notes="댓글 삭제 API")
    @ApiImplicitParam(name = "id", value = "댓글 id", dataType="Long", paramType="query", example = "1")
    @DeleteMapping("/api/comment")
    public ResponseEntity<?> delete(@RequestParam Long id){
        commentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
