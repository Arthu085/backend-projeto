package com.example.backend_projeto.dto.recommendation;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResponseRecommendationDTO {
    private Long id;
    private String description;
    private String userName;
    private String userEmail;
}
