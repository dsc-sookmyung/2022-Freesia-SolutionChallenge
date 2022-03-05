package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.community.CommunityRepository;
import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.dto.community.CommunityResponseDto;
import com.freesia.imyourfreesia.dto.community.CommunitySaveRequestDto;
import com.freesia.imyourfreesia.dto.community.CommunityUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;

    // 게시글 저장
    @Transactional
    public Community save(CommunitySaveRequestDto communitySaveRequestDto) {
        User user = userRepository.findByEmail(communitySaveRequestDto.getEmail()); // 이메일로 유저 정보로부터 아이디를 받아옴
        Community community = communitySaveRequestDto.toEntity();
        community.setUser(user);
        return communityRepository.save(community);
    }

    // 게시판 리스트 조회
    @Transactional
    public List<Community> list(String category) {
        return communityRepository.findByCategory(category);
    }

    // 게시글 상세페이지 조회
    @Transactional
    public CommunityResponseDto findById(Long id){
        Community community = communityRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
        return new CommunityResponseDto(community);
    }

    // 게시글 수정
    @Transactional
    public Community update(Long id, CommunityUpdateRequestDto communityUpdateRequestDto){
        Community community = communityRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
        return community.update(
                communityUpdateRequestDto.getTitle(),
                communityUpdateRequestDto.getContent(),
                community.getImage(),
                community.getCategory());
    }

    // 게시글 삭제
    @Transactional
    public void delete(Long id){
        Community community = communityRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
        communityRepository.delete(community);
    }

    // 이메일로 카테고리 별 내 게시글 조회
    @Transactional
    public List<Community> findByEmail(String email, String category) {
        User user = userRepository.findByEmail(email);
        return communityRepository.findByUidAndCategory(user, category);
    }

}