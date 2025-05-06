package com.example.backend_projeto.service.record;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend_projeto.dto.record.CreateRecordDTO;
import com.example.backend_projeto.dto.record.ResponseRecordDTO;
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

    public void delete(Long id) {
        Optional<Record> record = recordRepository.findById(id);
        if (record.isPresent()) {
            recordRepository.deleteById(id);
        } else {
            throw new RuntimeException("Registro não encontrado com o ID:" + id);
        }
    }

    public List<ResponseRecordDTO> getAllByUser(User user) {
        return recordRepository.findAll().stream()
                .filter(record -> record.getHabit().getUser().getId().equals(user.getId()))
                .map(record -> new ResponseRecordDTO(
                        record.getId(),
                        record.getHabit().getUser().getName(),
                        record.getHabit().getName(),
                        record.getDatePerformed()))
                .collect(Collectors.toList());
    }

}
