package com.shabir.lifemax.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/")
public class test {

    @GetMapping("hello")
    String helloWorld(){
        return "Hello World";
    };
}
