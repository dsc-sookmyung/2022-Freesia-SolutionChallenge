package com.freesia.imyourfreesia.service.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.freesia.imyourfreesia.dto.auth.KakaoOAuth2UserInfoDto;
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
public class KakaoService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper;

    public KakaoOAuth2UserInfoDto getUserInfoByAccessToken(String accessToken) {
        final String tokenInfoUri = "https://kapi.kakao.com/v2/user/me";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(tokenInfoUri, request, String.class);

            KakaoOAuth2UserInfoDto kakaoOAuth2UserInfoDto = objectMapper.readValue(response.getBody(), KakaoOAuth2UserInfoDto.class);

            return kakaoOAuth2UserInfoDto;

        } catch (RestClientException | JsonProcessingException e) {
            log.error(e.getMessage());

            throw new AccessTokenException();
        }
    }
}
