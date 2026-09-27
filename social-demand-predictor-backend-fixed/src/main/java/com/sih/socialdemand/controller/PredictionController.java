package com.sih.socialdemand.controller;

import com.sih.socialdemand.entity.Prediction;
import com.sih.socialdemand.service.PredictionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/predictions")
@CrossOrigin(origins = "*")
public class PredictionController {

    private final PredictionService service;

    public PredictionController(PredictionService service) {
        this.service = service;
    }

    @GetMapping
    public List<Prediction> getAll() {
        return service.getAll();
    }

    @GetMapping("/product/{productId}")
    public List<Prediction> getByProduct(@PathVariable Long productId) {
        return service.getByProduct(productId);
    }
}
