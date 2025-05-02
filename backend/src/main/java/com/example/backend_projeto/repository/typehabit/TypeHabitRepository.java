package com.example.backend_projeto.repository.typehabit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend_projeto.models.TypeHabit;

import java.util.Optional;

@Repository
public interface TypeHabitRepository extends JpaRepository<TypeHabit, Long> {
    Optional<TypeHabit> findById(Long id);
}