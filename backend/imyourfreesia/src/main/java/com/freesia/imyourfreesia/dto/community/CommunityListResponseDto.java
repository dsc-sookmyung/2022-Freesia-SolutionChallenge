package com.freesia.imyourfreesia.dto.community;

import com.freesia.imyourfreesia.domain.community.Community;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.io.File;

@Getter
public class CommunityListResponseDto {

    @ApiModelProperty(example = "게시글 아이디")
    private Long id;

    @ApiModelProperty(example = "게시글 작성자 아이디")
    private Long uid;

    @ApiModelProperty(example = "게시글 작성자 이메일")
    private String email;

    @ApiModelProperty(example = "게시글 작성자 닉네임")
    private String nickName;

    @ApiModelProperty(example = "게시글 제목")
    private String title;

    @ApiModelProperty(example = "게시글 내용")
    private String content;

    @ApiModelProperty(example = "게시글 썸네일 이미지")
    private String thumbnailImagePath;

    @ApiModelProperty(example = "카테고리")
    private String category;


    public CommunityListResponseDto(Community community){
        this.id = community.getId();
        this.uid = community.getUid().getId();
        this.email = community.getUid().getEmail();
        this.nickName = community.getUid().getNickName();
        this.title = community.getTitle();
        this.content = community.getContent();
        this.category = community.getCategory();

        String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;

        if(!community.getImage().isEmpty())
            this.thumbnailImagePath = absolutePath + community.getImage().get(0).getFilePath();
        else
            this.thumbnailImagePath = "null";
    }
}
