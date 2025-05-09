package com.example.backend_projeto.service.recommendation;

import com.example.backend_projeto.dto.recommendation.CreateRecommendationDTO;
import com.example.backend_projeto.dto.recommendation.EditRecommendationDTO;
import com.example.backend_projeto.dto.recommendation.ResponseRecommendationDTO;
import com.example.backend_projeto.models.Recommendation;
import com.example.backend_projeto.models.User;
import com.example.backend_projeto.repository.recommendation.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired
    private RecommendationRepository recommendationRepository;

    public void create(CreateRecommendationDTO dto, User user) {
        Recommendation recommendation = Recommendation.builder()
                .description(dto.getDescription())
                .user(user)
                .build();

        recommendationRepository.save(recommendation);
    }

    public void edit(Long id, EditRecommendationDTO dto) {
        Recommendation recommendation = recommendationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recomendação não encontrada"));

        recommendation.setDescription(dto.getDescription());
        recommendationRepository.save(recommendation);
    }

    public void delete(Long id) {
        recommendationRepository.deleteById(id);
    }

    public List<ResponseRecommendationDTO> getAllByUser(User user) {
        return recommendationRepository.findByUser(user).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private ResponseRecommendationDTO toDTO(Recommendation rec) {
        return ResponseRecommendationDTO.builder()
                .id(rec.getId())
                .description(rec.getDescription())
                .userName(rec.getUser().getName())
                .userEmail(rec.getUser().getEmail())
                .build();
    }
}
