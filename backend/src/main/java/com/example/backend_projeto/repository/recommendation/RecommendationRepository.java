package com.example.backend_projeto.repository.recommendation;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend_projeto.models.Recommendation;
import com.example.backend_projeto.models.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByUser(User user);
}