package com.example.backend_projeto.repository.record;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend_projeto.models.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
    Optional<Record> findByIdAndHabit_Id(Long id, Long habitId);
}
