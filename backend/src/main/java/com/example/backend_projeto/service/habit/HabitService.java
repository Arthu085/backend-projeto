package com.example.backend_projeto.service.habit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend_projeto.dto.habit.CreateHabitDTO;
import com.example.backend_projeto.models.Habit;
import com.example.backend_projeto.models.User;
import com.example.backend_projeto.repository.habit.HabitRepository;
import com.example.backend_projeto.repository.typehabit.TypeHabitRepository;

@Service
public class HabitService {

    @Autowired
    private HabitRepository habitRepository;

    @Autowired
    private TypeHabitRepository typeHabitRepository;

    public void create(CreateHabitDTO dto, User user) {
        Habit habit = Habit.builder().user(user)
                .typeHabit(typeHabitRepository.getReferenceById(dto.id_type())).name(dto.name()).build();
        habitRepository.save(habit);
    }
}
