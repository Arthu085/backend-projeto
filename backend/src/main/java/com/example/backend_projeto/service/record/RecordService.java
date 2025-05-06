package com.example.backend_projeto.service.record;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend_projeto.dto.record.CreateRecordDTO;
import com.example.backend_projeto.models.Habit;
import com.example.backend_projeto.models.Record;
import com.example.backend_projeto.models.User;
import com.example.backend_projeto.repository.habit.HabitRepository;
import com.example.backend_projeto.repository.record.RecordRepository;

@Service
public class RecordService {

    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private HabitRepository habitRepository;

    public void create(CreateRecordDTO dto, User user) {
        Habit habit = habitRepository.findByIdAndUser_Id(dto.id_habit(), user.getId())
                .orElseThrow(() -> new RuntimeException("Hábito não encontrado ou não pertence ao usuário."));

        Record record = Record.builder()
                .habit(habit)
                .datePerformed(LocalDateTime.now()) // data e hora atual
                .build();

        recordRepository.save(record);
    }

}
