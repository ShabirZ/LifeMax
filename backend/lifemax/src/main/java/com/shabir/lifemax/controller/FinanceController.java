package com.shabir.lifemax.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class FinanceController {
    @GetMapping("/hello")
    public String HelloWorld() {
        return "Hello World";
    }

}
