package com.wildcodeshool.bubbagump.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String getHome() {
        return "home";
    }

    @GetMapping("/menu")
    public String getMenu() {
        return "menu";
    }
}
