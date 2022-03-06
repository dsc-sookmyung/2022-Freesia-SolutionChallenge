package com.freesia.imyourfreesia.dto.community;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommunityUpdateRequestDto {

    @ApiModelProperty(example = "게시글 제목")
    private String title;

    @ApiModelProperty(example = "게시글 내용")
    private String content;

    @ApiModelProperty(example = "카테고리")
    private String category;

    @Builder
    public CommunityUpdateRequestDto(String title, String content, String category){
        this.title = title;
        this.content = content;
        this.category = category;
    }
}
