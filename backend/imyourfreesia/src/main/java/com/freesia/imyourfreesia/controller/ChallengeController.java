package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.domain.challenge.Challenge;
import com.freesia.imyourfreesia.domain.challenge.ChallengePhoto;
import com.freesia.imyourfreesia.domain.challenge.ChallengePhotoRepository;
import com.freesia.imyourfreesia.dto.challenge.*;
import com.freesia.imyourfreesia.service.ChallengePhotoService;
import com.freesia.imyourfreesia.service.ChallengeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Api(tags={"Challenge API"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ChallengeController {
    private final ChallengeService challengeService;
    private final ChallengePhotoService challengePhotoService;
    private final ChallengePhotoRepository challengePhotoRepository;

    /* 챌린지 등록 */
    @ApiOperation(value="챌린지 등록", notes="챌린지 등록 API")
    @ApiImplicitParam(name = "ChallengeSaveVO", value = "챌린지 저장 vo")
    @PostMapping("/challenge")
    public ResponseEntity<Long> saveChallenge(ChallengeSaveVO challengeSaveVO) throws Exception{

        ChallengeSaveRequestDto requestDto
                = ChallengeSaveRequestDto.builder()
                .uid(challengeSaveVO.getUid())
                .title(challengeSaveVO.getTitle())
                .contents(challengeSaveVO.getContents())
                .build();

        return ResponseEntity.ok()
                .body(challengeService.save(requestDto, challengeSaveVO.getFiles()));
    }

    /* 챌린지 리스트 조회 */
    @ApiOperation(value="챌린지 리스트 조회", notes="챌린지 리스트 조회 API")
    @GetMapping("/challenge/list")
    public ResponseEntity<List<ChallengeListResponseDto>> loadChallenge() throws Exception {

        List<Challenge> challengeList = challengeService.findAllDesc();

        List<ChallengeListResponseDto> responseDtoList = new ArrayList<>();

        for(Challenge challenge : challengeList){
            ChallengeListResponseDto responseDto = new ChallengeListResponseDto(challenge);
            responseDtoList.add(responseDto);
        }

        return ResponseEntity.ok()
                .body(responseDtoList);
    }

    /* 챌린지 상세 조회 */
    @ApiOperation(value="챌린지 상세 조회", notes="챌린지 상세 조회 API")
    @ApiImplicitParam(name = "id", value = "챌린지 id")
    @GetMapping("/challenge")
    public ResponseEntity<ChallengeResponseDto> loadChallengeDetail(@RequestParam Long id) throws Exception {

        List<ChallengePhotoResponseDto> photoResponseDtoList =
                challengePhotoService.findAllByChallenge(id);

        List<String> filePath = new ArrayList<>();
        String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;

        for(ChallengePhotoResponseDto photoResponseDto : photoResponseDtoList)
            filePath.add(absolutePath + photoResponseDto.getFilePath());

        return ResponseEntity.ok()
                .body(challengeService.findById(id, filePath));
    }

     /* 챌린지 수정 */
     @ApiOperation(value="챌린지 수정", notes="챌린지 수정 API")
     @ApiImplicitParams({
             @ApiImplicitParam(name = "id", value = "챌린지 id"),
             @ApiImplicitParam(name = "ChallengeSaveVO", value = "챌린지 저장 VO")
     })
    @PutMapping("/challenge")
    public ResponseEntity<Long> updateChallenge(@RequestParam Long id,
                                                     ChallengeSaveVO challengeSaveVO) throws Exception {
        ChallengeUpdateRequestDto requestDto =
                ChallengeUpdateRequestDto.builder()
                        .title(challengeSaveVO.getTitle())
                        .contents(challengeSaveVO.getContents())
                        .build();

        List<ChallengePhoto> dbPhotoList = challengePhotoRepository.findAllByChallengeId(id);
        List<MultipartFile> multipartList = challengeSaveVO.getFiles();
        List<MultipartFile> addFileList = new ArrayList<>();

        if(CollectionUtils.isEmpty(dbPhotoList)){
            if(!CollectionUtils.isEmpty(multipartList)){
                for(MultipartFile multipartFile : multipartList)
                    addFileList.add(multipartFile);
            }
        }else{
            if (CollectionUtils.isEmpty(multipartList)) {
                for(ChallengePhoto dbPhoto : dbPhotoList)
                    challengePhotoService.deletePhoto(dbPhoto.getId());
            }else{
                List<String> dbOriginNameList = new ArrayList<>();

                for(ChallengePhoto dbPhoto : dbPhotoList){
                    ChallengePhotoDto dbPhotoDto = challengePhotoService.findByImageId(dbPhoto.getId());
                    String dbOrigFileName = dbPhotoDto.getOrigFileName();

                    if(!multipartList.contains(dbOrigFileName)){
                        challengePhotoService.deletePhoto(dbPhoto.getId());
                    }else{
                        dbOriginNameList.add(dbOrigFileName);
                    }

                    for (MultipartFile multipartFile : multipartList) {

                        String multipartOrigName = multipartFile.getOriginalFilename();
                        if(!dbOriginNameList.contains(multipartOrigName)){
                            addFileList.add(multipartFile);
                        }
                    }
                }

            }
        }

        return ResponseEntity.ok()
                .body(challengeService.updateChallenge(id, requestDto, addFileList).getId());
    }

    /* 챌린지 삭제 */
    @ApiOperation(value="챌린지 삭제", notes="챌린지 삭제 API")
    @ApiImplicitParam(name = "id", value = "챌린지 id")
    @DeleteMapping("/challenge")
    public ResponseEntity<?> deleteChallenge(@RequestParam Long id){
        challengeService.deleteChallenge(id);
        return ResponseEntity.noContent().build();
    }

    /* 챌린지별 이미지 전체 조회
    @ApiOperation(value="챌린지별 이미지 전체 조회", notes="챌린지별 이미지 전체 조회 API")
    @ApiImplicitParam(name = "id", value = "챌린지 id")
    @GetMapping("/challenge/img/list")
    public ResponseEntity<List<ChallengePhotoDto>> getChallengeImg(@RequestParam Long id) throws IOException {
        List<ChallengePhotoResponseDto> photoResponseDtoList
                = challengePhotoService.findAllByChallenge(id);

        List<Long> imageId = new ArrayList<>();

        for(ChallengePhotoResponseDto photoResponseDto : photoResponseDtoList)
            imageId.add(photoResponseDto.getImageId());

        List<ChallengePhotoDto> photoList = challengePhotoService.imageList(id);

        return ResponseEntity.ok()
                .body(photoList);
    }*/

    /* 챌린지 이미지 개별 조회 (썸네일)
    @ApiOperation(value="챌린지 이미지 개별 조회(썸네일)", notes="챌린지별 이미지 개별 조회(썸네일) API")
    @ApiImplicitParam(name = "thumnailId", value = "썸네일 id(thumnailId)")
    @GetMapping("/challenge/img")
    public ResponseEntity<ChallengePhotoDto> getChallengeThumnail(@RequestParam Long thumnailId) throws IOException {
        ChallengePhotoDto photoDto = challengePhotoService.findByImageId(thumnailId);

        return ResponseEntity.ok()
                .body(photoDto);
    }*/

}
