package com.freesia.imyourfreesia.dto.emoticon;

import com.freesia.imyourfreesia.domain.challenge.Challenge;
import com.freesia.imyourfreesia.domain.emoticon.Emoticon;
import com.freesia.imyourfreesia.domain.user.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class EmoticonResponseDto {

    @ApiModelProperty(example = "이모티콘 1 갯수")
    private Long emoticon1;

    @ApiModelProperty(example = "이모티콘 2 갯수")
    private Long emoticon2;

    @ApiModelProperty(example = "이모티콘 3 갯수")
    private Long emoticon3;

    @ApiModelProperty(example = "이모티콘 4 갯수")
    private Long emoticon4;

    @ApiModelProperty(example = "이모티콘 5 갯수")
    private Long emoticon5;


    public EmoticonResponseDto(Long emoticon1, Long emoticon2, Long emoticon3, Long emoticon4, Long emoticon5) {
        this.emoticon1 = emoticon1;
        this.emoticon2 = emoticon2;
        this.emoticon3 = emoticon3;
        this.emoticon4 = emoticon4;
        this.emoticon5 = emoticon5;
    }
}
