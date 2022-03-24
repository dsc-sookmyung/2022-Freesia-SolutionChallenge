package com.freesia.imyourfreesia.dto.community;

import com.freesia.imyourfreesia.domain.community.Community;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class CommunityResponseDto {

    @ApiModelProperty(example = "게시글 아이디")
    private Long id;

    @ApiModelProperty(example = "게시글 작성자 아이디")
    private Long uid;

    @ApiModelProperty(example = "생성 날짜")
    // private String createdDate;
    private LocalDate createdDate;

    @ApiModelProperty(example = "게시글 작성자 이메일")
    private String email;

    @ApiModelProperty(example = "게시글 작성자 닉네임")
    private String nickName;

    @ApiModelProperty(example = "게시글 제목")
    private String title;

    @ApiModelProperty(example = "게시글 내용")
    private String content;

    @ApiModelProperty(example = "게시글 이미지")
    private List<Long> fileId;

    @ApiModelProperty(example = "카테고리")
    private String category;

    public CommunityResponseDto(Community community, List<Long> fileId){
        this.id = community.getId();
        this.uid = community.getUid().getId();
        this.createdDate = community.getCreatedDate();
        this.email = community.getUid().getEmail();
        this.nickName = community.getUid().getNickName();
        this.title = community.getTitle();
        this.content = community.getContent();
        this.fileId = fileId;
        this.category = community.getCategory();
    }
}
