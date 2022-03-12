package com.freesia.imyourfreesia.dto.emoticon;

import com.freesia.imyourfreesia.domain.emoticon.Emoticon;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmoticonRequestDto {

    @ApiModelProperty(example = "이모티콘 작성자 이메일")
    private String email;

    @ApiModelProperty(example = "게시글 아이디")
    private Long challengeId;

    @ApiModelProperty(example = "이모티콘 이름")
    private String emoticonName;

    @Builder
    public EmoticonRequestDto(String email, Long challengeId, String emoticonName){
        this.email = email;
        this.challengeId = challengeId;
        this.emoticonName = emoticonName;
    }

    public Emoticon toEntity(){
        return Emoticon.builder()
                .emoticonName(emoticonName)
                .build();
    }
}