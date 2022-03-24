package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.community.Photo;
import com.freesia.imyourfreesia.domain.community.PhotoRepository;
import com.freesia.imyourfreesia.dto.community.*;
import com.freesia.imyourfreesia.service.CommunityService;
import com.freesia.imyourfreesia.service.PhotoService;
import com.nimbusds.oauth2.sdk.util.CollectionUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Api(tags={"Community API"})
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CommunityController {

    private final CommunityService communityService;
    private final PhotoService photoService;
    private final PhotoRepository photoRepository;

    // 게시글 저장
    @PostMapping(value = "/api/community", consumes = {"multipart/form-data"})
    @ApiOperation(value="커뮤니티 글 저장 (사용 X / 포스트맨 이용)", notes="커뮤니티 글 저장 API")
    public Long save(
            CommunityFileVO communityFileVO) throws Exception{

        CommunitySaveRequestDto communitySaveRequestDto =
                CommunitySaveRequestDto.builder()
                        .email(communityFileVO.getEmail())
                        .title(communityFileVO.getTitle())
                        .content(communityFileVO.getContent())
                        .category(communityFileVO.getCategory())
                        .build();

        return communityService.save(communitySaveRequestDto, communityFileVO.getFiles());
    }

    // 게시판 리스트 조회 (고민, 후기, 모임)
    @GetMapping("/communities")
    @ApiOperation(value="카테고리에 따른 (고민, 후기, 모임) 게시판 리스트 조회", notes="카테고리에 따른 (고민, 후기, 모임) 게시판 리스트 조회 API")
    @ApiImplicitParam(name = "category", value = "카테고리명")
    public List<CommunityListResponseDto> list(@RequestParam String category) throws Exception{

        List<Community> communityList = communityService.list(category);
        List<CommunityListResponseDto> communityListResponseDtoList = new ArrayList<>();

        for (Community community: communityList) {
            CommunityListResponseDto communityResponseDto = new CommunityListResponseDto(community);
            communityListResponseDtoList.add(communityResponseDto);
        }

        return communityListResponseDtoList;
    }

    // 게시글 상세 조회
    @GetMapping("/community")
    @ApiOperation(value="커뮤니티 글 상세 조회", notes="커뮤니티 글 상세 조회 API")
    @ApiImplicitParam(name = "id", value = "게시글 id", example = "1")
    public CommunityResponseDto view(@RequestParam Long id) throws Exception{

        List<PhotoResponseDto> photoResponseDtoList = photoService.findAllByCommunity(id);
        List<String> filePath = new ArrayList<>();

        String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;

        for (PhotoResponseDto photoResponseDto : photoResponseDtoList) {
            filePath.add(absolutePath+photoResponseDto.getFilePath());
        }

        return communityService.findById(id, filePath);
    }

    // 게시글 수정
    @PutMapping("/api/community")
    @ApiOperation(value="커뮤니티 글 수정 (사용 X / 포스트맨 이용)", notes="게시글 글 수정 API")
    public Long update(
            @RequestParam(value = "id") Long id,
            CommunityFileVO communityFileVO) throws Exception{

        CommunityUpdateRequestDto communityUpdateRequestDto =
                CommunityUpdateRequestDto.builder()
                        .title(communityFileVO.getTitle())
                        .content(communityFileVO.getContent())
                        .category(communityFileVO.getCategory())
                        .build();

        List<Photo> dbPhotoList = photoRepository.findAllByCommunityId(id);
        List<MultipartFile> multipartList = communityFileVO.getFiles();
        List<MultipartFile> addFileList = new ArrayList<>();

        if(CollectionUtils.isEmpty(dbPhotoList)) {
            if(!CollectionUtils.isEmpty(multipartList)) {
                for (MultipartFile multipartFile : multipartList)
                    addFileList.add(multipartFile);
            }
        }
        else {
            if(CollectionUtils.isEmpty(multipartList)) {
                for(Photo dbPhoto : dbPhotoList)
                    photoService.delete(dbPhoto.getId());
            }
            else {
                List<String> dbOriginNameList = new ArrayList<>();

                for(Photo dbPhoto : dbPhotoList) {
                    PhotoDto dbPhotoDto = photoService.findByFileId(dbPhoto.getId());
                    String dbOrigFileName = dbPhotoDto.getOrigFileName();

                    if(!multipartList.contains(dbOrigFileName))
                        photoService.delete(dbPhoto.getId());
                    else
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

        return communityService.update(id, communityUpdateRequestDto, addFileList);
    }

    // 게시글 삭제
    @DeleteMapping("/api/community")
    @ApiOperation(value="커뮤니티 글 삭제", notes="게시글 글 삭제 API")
    @ApiImplicitParam(name = "id", value = "게시글 id", example = "1")
    public Long delete(@RequestParam Long id){
        communityService.delete(id);
        return id;
    }

    // 카테고리에 따른 내 게시글 가져오기
    @GetMapping("/api/community/my")
    @ApiOperation(value="커뮤니티 내 글 조회", notes="커뮤니티 내 글 조회 API")
    @ApiImplicitParam(name = "email", value = "사용자 이메일")
    public List<CommunityListResponseDto> my(@RequestParam String email) throws Exception{

        List<Community> communityList = communityService.findByEmail(email);
        List<CommunityListResponseDto> communityListResponseDtoList = new ArrayList<>();

        for (Community community: communityList) {
            CommunityListResponseDto communityResponseDto = new CommunityListResponseDto(community);
            communityListResponseDtoList.add(communityResponseDto);
        }

        return communityListResponseDtoList;
    }

}
