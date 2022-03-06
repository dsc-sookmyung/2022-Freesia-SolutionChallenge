package com.freesia.imyourfreesia.controller;

import com.freesia.imyourfreesia.dto.community.PhotoDto;
import com.freesia.imyourfreesia.dto.community.PhotoResponseDto;
import com.freesia.imyourfreesia.service.PhotoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Api(tags={"freesia Photo API"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PhotoController {

    private final PhotoService photoService;

    @GetMapping(value = "/image/id", produces = {MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE})
    @ApiOperation(value="이미지 아이디로 개별 조회", notes="이미지 아이디로 개별 조회 API")
    @ApiImplicitParam(name = "id", value = "이미지 아이디")
    public byte[] getImageById(@RequestParam Long id) throws IOException {

        PhotoDto photoDto = photoService.findByFileId(id);
        String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;
        String path = photoDto.getFilePath();

        InputStream imageStream = new FileInputStream(absolutePath + path);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();

        return imageByteArray;
    }

    @GetMapping("/image")
    @ApiOperation(value="글에 따른 이미지 아이디 전체 조회", notes="글에 따른 이미지 전체 조회 API")
    @ApiImplicitParam(name = "id", value = "글 아이디")
    public List<Long> getImageByCommunity(@RequestParam Long id) throws IOException {

        List<PhotoResponseDto> photoResponseDtoList = photoService.findAllByCommunity(id);
        List<Long> photoId = new ArrayList<>();
        for(PhotoResponseDto photoResponseDto : photoResponseDtoList)
            photoId.add(photoResponseDto.getFileId());

        return photoService.searchById(id, photoId).getFileId();
    }
}
