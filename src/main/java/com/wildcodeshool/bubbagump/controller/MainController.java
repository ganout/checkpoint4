package com.wildcodeshool.bubbagump.controller;

import com.wildcodeshool.bubbagump.entity.Dish;
import com.wildcodeshool.bubbagump.repository.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class MainController {

    @Autowired
    private DishRepository dishRepository;

    @GetMapping("/")
    public String getHome() {
        return "home";
    }

    @GetMapping("/menu")
    public String getMenu(Model model) {

        List<Dish> dishList = new ArrayList<>();
        List<Dish> dishListStart = new ArrayList<>();
        List<Dish> dishListMiddle = new ArrayList<>();
        List<Dish> dishListEnd = new ArrayList<>();

        dishList = dishRepository.findAll();

        dishListStart = dishList.stream()
                .filter(item -> item.getMealTime().getId() == 1)
                .collect(Collectors.toList());
        dishListMiddle = dishList.stream()
                .filter(item -> item.getMealTime().getId() == 2)
                .collect(Collectors.toList());
        dishListEnd = dishList.stream()
                .filter(item -> item.getMealTime().getId() == 3)
                .collect(Collectors.toList());

        model.addAttribute("dishListStart", dishListStart);
        model.addAttribute("dishListMiddle", dishListMiddle);
        model.addAttribute("dishListEnd", dishListEnd);

        return "menu";
    }


}
