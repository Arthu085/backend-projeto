package com.example.backend_projeto.dto.recommendation;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateRecommendationDTO {
    private String description;
    private Long habitId; // ID do hábito relacionado
    private Long userId;  // ID do usuário (opcional se já autenticado)
}
