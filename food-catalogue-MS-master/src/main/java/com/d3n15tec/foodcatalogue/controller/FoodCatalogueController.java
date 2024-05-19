package com.d3n15tec.foodcatalogue.controller;

import com.d3n15tec.foodcatalogue.dto.FoodCataloguePage;
import com.d3n15tec.foodcatalogue.dto.FoodItemDTO;
import com.d3n15tec.foodcatalogue.service.FoodCatalogueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/catalogo-food")
@CrossOrigin
public class FoodCatalogueController {

    @Autowired
    FoodCatalogueService foodCatalogueService;

    @PostMapping("/add-food")
    public ResponseEntity<FoodItemDTO> addFoodItem(@RequestBody FoodItemDTO foodItemDTO){
        FoodItemDTO foodItemSaved = foodCatalogueService.addFoodItem(foodItemDTO);
        return new ResponseEntity<>(foodItemSaved, HttpStatus.CREATED);
    }

    @GetMapping("/buscar-restaurante-food/{restaurantId}")
    public ResponseEntity<FoodCataloguePage> fetchRestauDetailsWithFoodMenu(@PathVariable Integer restaurantId){
        FoodCataloguePage foodCataloguePage = foodCatalogueService.fetchFoodCataloguePageDetails(restaurantId);
        return new ResponseEntity<>(foodCataloguePage, HttpStatus.OK);


    }



}
