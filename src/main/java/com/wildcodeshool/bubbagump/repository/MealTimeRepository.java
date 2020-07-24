package com.wildcodeshool.bubbagump.repository;

import com.wildcodeshool.bubbagump.entity.Dish;
import com.wildcodeshool.bubbagump.entity.MealTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MealTimeRepository extends JpaRepository<MealTime, Long> {

    MealTime findByName(String name);
}
