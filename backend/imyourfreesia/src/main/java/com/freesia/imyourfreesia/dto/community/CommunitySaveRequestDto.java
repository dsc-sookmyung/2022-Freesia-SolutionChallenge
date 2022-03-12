package com.freesia.imyourfreesia.dto.community;

import com.freesia.imyourfreesia.domain.community.Community;
import com.freesia.imyourfreesia.domain.user.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommunitySaveRequestDto {

    @ApiModelProperty(example = "게시글 작성자 아이디")
    private User uid;

    @ApiModelProperty(example = "게시글 작성자 이메일")
    private String email;

    @ApiModelProperty(example = "게시글 제목")
    private String title;

    @ApiModelProperty(example = "게시글 내용")
    private String content;

    @ApiModelProperty(example = "카테고리")
    private String category;

    @Builder
    public CommunitySaveRequestDto(String email, String title, String content, String category){
        this.email = email;
        this.title = title;
        this.content = content;
        this.category = category;
    }

    public Community toEntity(){
        return Community.builder()
                .uid(uid)
                .title(title)
                .content(content)
                .category(category)
                .build();
    }
}
