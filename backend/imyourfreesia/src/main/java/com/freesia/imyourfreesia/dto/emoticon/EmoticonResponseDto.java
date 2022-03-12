package com.freesia.imyourfreesia.dto.emoticon;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class EmoticonResponseDto {

    @ApiModelProperty(example = "이모티콘 1 갯수")
    private int emoticon1;

    @ApiModelProperty(example = "이모티콘 2 갯수")
    private int emoticon2;

    @ApiModelProperty(example = "이모티콘 3 갯수")
    private int emoticon3;

    @ApiModelProperty(example = "이모티콘 4 갯수")
    private int emoticon4;

    @ApiModelProperty(example = "이모티콘 5 갯수")
    private int emoticon5;


    public EmoticonResponseDto(int emoticon1, int emoticon2, int emoticon3, int emoticon4, int emoticon5) {
        this.emoticon1 = emoticon1;
        this.emoticon2 = emoticon2;
        this.emoticon3 = emoticon3;
        this.emoticon4 = emoticon4;
        this.emoticon5 = emoticon5;
    }
}
