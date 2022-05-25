package com.freesia.imyourfreesia.service.auth;

// 사용자 정의 인터페이스
public interface EmailService {
    String sendAuthMail(String to) throws Exception;
}
