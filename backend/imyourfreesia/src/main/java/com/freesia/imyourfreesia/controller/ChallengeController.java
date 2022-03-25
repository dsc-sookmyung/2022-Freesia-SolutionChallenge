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
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Api(tags={"Challenge API"})
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ChallengeController {
    private final ChallengeService challengeService;
    private final ChallengePhotoService challengePhotoService;
    private final ChallengePhotoRepository challengePhotoRepository;

    /* 챌린지 등록 */
    @ApiOperation(value="챌린지 등록", notes="챌린지 등록 API")
    @ApiImplicitParam(name = "ChallengeSaveVO", value = "챌린지 저장 vo")
    @PostMapping("/api/challenge")
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
    @ApiImplicitParam(name = "id", value = "챌린지 id", example = "1")
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
             @ApiImplicitParam(name = "id", value = "챌린지 id", example = "1"),
             @ApiImplicitParam(name = "ChallengeSaveVO", value = "챌린지 저장 VO")
     })
    @PutMapping("/api/challenge")
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
    @ApiImplicitParam(name = "id", value = "챌린지 id", example = "1")
    @DeleteMapping("/api/challenge")
    public ResponseEntity<?> deleteChallenge(@RequestParam Long id){
        challengeService.deleteChallenge(id);
        return ResponseEntity.noContent().build();
    }

    /* 챌린지 이미지 ByteArray 조회 */
    @ApiOperation(value="챌린지 이미지 ByteArray 조회", notes="챌린지 이미지 ByteArray 조회 API")
    @ApiImplicitParam(name = "id", value = "챌린지 이미지 id", example = "1")
    @GetMapping(
            value = "/challenge/image",
            produces = {MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE}
    )
    public ResponseEntity<String> getImage(@RequestParam Long id) throws IOException {
        ChallengePhotoDto photoDto = challengePhotoService.findByImageId(id);
        String absolutePath
                = new File("").getAbsolutePath() + File.separator + File.separator;
        String path = photoDto.getFilePath();

        InputStream imageStream = new FileInputStream(absolutePath + path);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        String encodedString = Base64.getEncoder().encodeToString(imageByteArray);
        imageStream.close();

        return new ResponseEntity<>(encodedString, HttpStatus.OK);
    }

}
