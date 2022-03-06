package com.freesia.imyourfreesia.dto.community;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CommunityFileVO {
    private String email;

    private String title;

    private String content;

    private String category;

    private List<MultipartFile> files;
}
