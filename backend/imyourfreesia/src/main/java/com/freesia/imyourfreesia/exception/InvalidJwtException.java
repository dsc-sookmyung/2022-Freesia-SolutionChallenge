package com.freesia.imyourfreesia.exception;

public class InvalidJwtException extends RuntimeException {

    private static final String MESSAGE = "유효하지 않은 토큰입니다.";

    public InvalidJwtException() {
        super(MESSAGE);
    }

    public static String getErrorMessage() {
        return MESSAGE;
    }
}