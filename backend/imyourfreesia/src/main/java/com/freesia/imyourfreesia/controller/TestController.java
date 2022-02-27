package com.freesia.imyourfreesia.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class TestController {

    @GetMapping("/test")
    public String index() {
        return "Hello World";
    }
}