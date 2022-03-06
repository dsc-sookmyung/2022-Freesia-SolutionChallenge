package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.community.CommunityRepository;
import com.freesia.imyourfreesia.domain.community.Photo;
import com.freesia.imyourfreesia.domain.community.PhotoRepository;
import com.freesia.imyourfreesia.dto.community.CommunityResponseDto;
import com.freesia.imyourfreesia.dto.community.PhotoDto;
import com.freesia.imyourfreesia.dto.community.PhotoResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final CommunityRepository communityRepository;

    // 이미지 아이디에 따른 이미지 개별 조회
    @Transactional(readOnly = true)
    public PhotoDto findByFileId(Long id){

        Photo photo = photoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 파일이 존재하지 않습니다."));

        PhotoDto photoDto = PhotoDto.builder()
                .origFileName(photo.getOrigFileName())
                .filePath(photo.getFilePath())
                .fileSize(photo.getFileSize())
                .build();

        return photoDto;
    }

    // 게시글 아이디에 따른 이미지 전체 조회
    @Transactional(readOnly = true)
    public List<PhotoResponseDto> findAllByCommunity(Long communityId){

        List<Photo> photoList = photoRepository.findAllByCommunityId(communityId);

        return photoList.stream()
                .map(PhotoResponseDto::new)
                .collect(Collectors.toList());
    }

    // 게시글 아이디에 따른 이미지 개별 조회
    @Transactional(readOnly = true)
    public CommunityResponseDto searchById(Long id, List<Long> fileId){
        Community community = communityRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

        return new CommunityResponseDto(community, fileId);
    }

    // 이미지 삭제
    @Transactional
    public void delete(Long id){
        Photo photo = photoRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 이미지가 없습니다. id="+id));
        photoRepository.delete(photo);
    }
}
