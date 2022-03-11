package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.community.CommunityRepository;
import com.freesia.imyourfreesia.domain.community.Photo;
import com.freesia.imyourfreesia.domain.community.PhotoRepository;
import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.community.CommunityResponseDto;
import com.freesia.imyourfreesia.dto.community.CommunitySaveRequestDto;
import com.freesia.imyourfreesia.dto.community.CommunityUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final PhotoRepository photoRepository;
    private final FileHandler fileHandler;

    // 게시글 저장
    @Transactional
    public Long save(CommunitySaveRequestDto communitySaveRequestDto, List<MultipartFile> files) throws Exception {
        User user = userRepository.findByEmail(communitySaveRequestDto.getEmail());
        Community community = communitySaveRequestDto.toEntity();
        community.setUser(user);

        List<Photo> photoList = fileHandler.parseFileInfo(files);

        if(!photoList.isEmpty()) {
            for(Photo photo: photoList) {
                community.addImage(photoRepository.save(photo));
            }
        }

        return communityRepository.save(community).getId();
    }

    // 게시판 리스트 조회
    @Transactional
    public List<Community> list(String category) {
        return communityRepository.findByCategory(category);
    }

    // 게시글 상세페이지 조회
    @Transactional
    public CommunityResponseDto findById(Long id, List<String> filePath){
        Community community = communityRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
        return new CommunityResponseDto(community, filePath);
    }

    // 게시글 수정
    @Transactional
    public Long update(Long id, CommunityUpdateRequestDto communityUpdateRequestDto, List<MultipartFile> files) throws Exception {
        Community community = communityRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id="+id));

        List<Photo> photoList = fileHandler.parseFileInfo(files);

        if(!photoList.isEmpty()) {
            for(Photo photo : photoList) {
                photo.setCommunity(community);
                photoRepository.save(photo);
            }
        }

        community.update(communityUpdateRequestDto.getTitle(), communityUpdateRequestDto.getContent(), community.getCategory());

        return id;
    }

    // 게시글 삭제
    @Transactional
    public void delete(Long id){
        Community community = communityRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
        communityRepository.delete(community);
    }

    // 이메일로 카테고리에서 내 게시글 조회
    @Transactional
    public List<Community> findByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return communityRepository.findByUid(user);
    }

}