package com.freesia.imyourfreesia.dto.community;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PhotoDto {

    @ApiModelProperty(example = "파일 원본 이름")
    private String origFileName;

    @ApiModelProperty(example = "파일 경로")
    private String filePath;

    @ApiModelProperty(example = "파일 크기")
    private Long fileSize;

    @Builder
    public PhotoDto(String origFileName, String filePath, Long fileSize){
        this.origFileName = origFileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }
}
