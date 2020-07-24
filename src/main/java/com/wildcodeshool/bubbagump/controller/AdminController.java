package com.wildcodeshool.bubbagump.controller;

import com.wildcodeshool.bubbagump.entity.Dish;
import com.wildcodeshool.bubbagump.entity.MealTime;
import com.wildcodeshool.bubbagump.repository.DishRepository;
import com.wildcodeshool.bubbagump.repository.MealTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
public class AdminController {

    @Autowired
    private DishRepository dishRepository;

    @Autowired
    private MealTimeRepository mealTimeRepository;

    @GetMapping("/admin")
    public String getAdmin() {
        return "admin";
    }

    @GetMapping("/admin-menu")
    public String getMenu(Model model) {

        List<Dish> dishList = new ArrayList<>();
        dishList = dishRepository.findAll();

        List<MealTime> mealTimeList = mealTimeRepository.findAll();

        model.addAttribute("dishList", dishList);
        model.addAttribute("mealTimeList", mealTimeList);
        model.addAttribute("dishSelected", new Dish());

        return "admin-menu";
    }

    @GetMapping("/admin-menu/{name}")
    public String getDishSelected(@PathVariable String name, Model model) {

        List<MealTime> mealTimeList = mealTimeRepository.findAll();

        if (name.equals("new")) {
            Dish dish = new Dish();
            model.addAttribute("dishSelected", dish);
        } else {
            Optional<Dish> optionalDish = dishRepository.findByName(name);
            if (optionalDish.isPresent()) {
                Dish dishSelected = optionalDish.get();
                model.addAttribute("dishSelected", dishSelected);
            }
        }

        model.addAttribute("mealTimeList", mealTimeList);
        return "dish-selected";
    }

    @PostMapping("/admin/menu")
    public String postMenu(@ModelAttribute Dish dish) {

        Optional<Dish> optionalDish = dishRepository.findByName(dish.getName());

        if (optionalDish.isPresent()) {
            Dish dishToSave = optionalDish.get();
            dish.setId(dishToSave.getId());
        }


        dish.setImage("/image/shrimp.jpg");
        dishRepository.save(dish);

        return "redirect:/admin-menu";
    }
}