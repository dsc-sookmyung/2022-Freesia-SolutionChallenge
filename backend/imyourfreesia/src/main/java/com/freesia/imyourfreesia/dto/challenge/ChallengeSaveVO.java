package com.freesia.imyourfreesia.dto.challenge;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ChallengeSaveVO {
    private String uid;
    private String title;
    private String contents;
    private List<MultipartFile> files;
}
