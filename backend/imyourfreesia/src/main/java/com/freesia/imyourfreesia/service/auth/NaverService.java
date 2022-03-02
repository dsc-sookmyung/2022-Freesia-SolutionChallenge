package com.freesia.imyourfreesia.service.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.freesia.imyourfreesia.dto.auth.NaverOAuth2UserInfoDto;
import com.freesia.imyourfreesia.exception.AccessTokenException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class NaverService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper;

    public NaverOAuth2UserInfoDto getUserInfoByAccessToken(String accessToken) {
        final String tokenInfoUri = "https://openapi.naver.com/v1/nid/me";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(tokenInfoUri, request, String.class);

            NaverOAuth2UserInfoDto naverOAuth2UserInfoDto = objectMapper.readValue(response.getBody(), NaverOAuth2UserInfoDto.class);

            return naverOAuth2UserInfoDto;

        } catch (RestClientException | JsonProcessingException e) {
            log.error(e.getMessage());

            throw new AccessTokenException();
        }
    }
}
