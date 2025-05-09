package com.example.backend_projeto.controller.recommendation;

import com.example.backend_projeto.dto.recommendation.CreateRecommendationDTO;
import com.example.backend_projeto.dto.recommendation.EditRecommendationDTO;
import com.example.backend_projeto.dto.recommendation.ResponseRecommendationDTO;
import com.example.backend_projeto.models.User;
import com.example.backend_projeto.service.recommendation.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recommendation")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody CreateRecommendationDTO dto, @AuthenticationPrincipal User user) {
        recommendationService.create(dto, user);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Void> edit(@PathVariable Long id, @RequestBody EditRecommendationDTO dto) {
        recommendationService.edit(id, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        recommendationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/fetch")
    public ResponseEntity<List<ResponseRecommendationDTO>> getAll(@AuthenticationPrincipal User user) {
        List<ResponseRecommendationDTO> recommendations = recommendationService.getAllByUser(user);
        return ResponseEntity.ok(recommendations);
    }
}
