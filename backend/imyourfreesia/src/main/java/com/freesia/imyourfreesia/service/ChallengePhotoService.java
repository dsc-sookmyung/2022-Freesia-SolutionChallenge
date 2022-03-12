package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.challenge.ChallengePhoto;
import com.freesia.imyourfreesia.domain.challenge.ChallengePhotoRepository;
import com.freesia.imyourfreesia.dto.challenge.ChallengePhotoDto;
import com.freesia.imyourfreesia.dto.challenge.ChallengePhotoResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChallengePhotoService {
    private final ChallengePhotoRepository challengePhotoRepository;


    /* 이미지 개별 조회 */
    @Transactional(readOnly = true)
    public ChallengePhotoDto findByImageId(Long id){
        ChallengePhoto challengePhoto = challengePhotoRepository.findById(id)
                .orElseThrow(IllegalArgumentException::new);

        ChallengePhotoDto challengePhotoDto = ChallengePhotoDto.builder()
                .origFileName(challengePhoto.getOrigFileName())
                .filePath(challengePhoto.getFilePath())
                .fileSize(challengePhoto.getFileSize())
                .build();

        return challengePhotoDto;
    }

    /* 이미지 아이디 리스트 조회 */
    @Transactional(readOnly = true)
    public List<ChallengePhotoResponseDto> findAllByChallenge(Long challengeId){

        List<ChallengePhoto> photoList = challengePhotoRepository.findAllByChallengeId(challengeId);

        return photoList.stream()
                .map(ChallengePhotoResponseDto::new)
                .collect(Collectors.toList());

    }

    /* 이미지 리스트 조회 */
    @Transactional(readOnly = true)
    public List<ChallengePhotoDto> imageList(Long challengeId){

        List<ChallengePhoto> imgList = challengePhotoRepository.findByChallengeId(challengeId);

        return imgList.stream()
                .map(ChallengePhotoDto::new)
                .collect(Collectors.toList());
    }

    /* 이미지 삭제 */
    @Transactional
    public void deletePhoto(Long id){
        ChallengePhoto challengePhoto = challengePhotoRepository.findById(id)
                .orElseThrow(IllegalArgumentException::new);

        challengePhotoRepository.delete(challengePhoto);
    }
}
