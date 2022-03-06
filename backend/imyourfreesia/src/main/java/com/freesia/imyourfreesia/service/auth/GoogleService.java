package com.freesia.imyourfreesia.service.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.freesia.imyourfreesia.exception.AccessTokenException;
import com.freesia.imyourfreesia.dto.auth.GoogleOAuth2UserInfoDto;
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
public class GoogleService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper;

    public GoogleOAuth2UserInfoDto getUserInfoByAccessToken(String accessToken) {
        final String tokenInfoUri = "https://oauth2.googleapis.com/tokeninfo";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("access_token", accessToken);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(tokenInfoUri, request, String.class);

            GoogleOAuth2UserInfoDto googleOAuth2UserInfoDto = objectMapper.readValue(response.getBody(), GoogleOAuth2UserInfoDto.class);

            return googleOAuth2UserInfoDto;

        } catch (RestClientException | JsonProcessingException e) {
            log.error(e.getMessage());

            throw new AccessTokenException();
        }
    }
}
