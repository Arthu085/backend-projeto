package com.example.backend_projeto.service.recommendation;

import com.example.backend_projeto.dto.recommendation.CreateRecommendationDTO;
import com.example.backend_projeto.dto.recommendation.EditRecommendationDTO;
import com.example.backend_projeto.dto.recommendation.ResponseRecommendationDTO;
import com.example.backend_projeto.dto.habit.ResponseHabitDTO;
import com.example.backend_projeto.models.Habit;
import com.example.backend_projeto.models.Recommendation;
import com.example.backend_projeto.models.User;
import com.example.backend_projeto.repository.habit.HabitRepository;
import com.example.backend_projeto.repository.recommendation.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired
    private RecommendationRepository recommendationRepository;

    @Autowired
    private HabitRepository habitRepository;

    public void create(CreateRecommendationDTO dto, User user) {
        Habit habit = habitRepository.findById(dto.getHabitId())
                .orElseThrow(() -> new RuntimeException("Hábito não encontrado"));

        Recommendation recommendation = Recommendation.builder()
                .description(dto.getDescription())
                .habit(habit)
                .user(user)
                .build();

        recommendationRepository.save(recommendation);
    }

    public void edit(Long id, EditRecommendationDTO dto) {
        Recommendation recommendation = recommendationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recomendação não encontrada"));

        Habit habit = habitRepository.findById(dto.getHabitId())
                .orElseThrow(() -> new RuntimeException("Hábito não encontrado"));

        recommendation.setDescription(dto.getDescription());
        recommendation.setHabit(habit);

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
                .habit(ResponseHabitDTO.builder()
                        .id(rec.getHabit().getId())
                        .name(rec.getHabit().getName())
                        .typeName(rec.getHabit().getTypeHabit().getName())
                        .idUser(rec.getHabit().getUser().getId())
                        .build())
                .userName(rec.getUser().getName())
                .userEmail(rec.getUser().getEmail())
                .build();
    }
}
