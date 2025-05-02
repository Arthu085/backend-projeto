package com.example.backend_projeto.service.habit;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend_projeto.dto.habit.CreateHabitDTO;
import com.example.backend_projeto.dto.habit.EditHabitDTO;
import com.example.backend_projeto.dto.habit.ResponseHabitDTO;
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

    public void delete(Long id) {
        Optional<Habit> habit = habitRepository.findById(id);
        if (habit.isPresent()) {
            habitRepository.deleteById(id);
        } else {
            throw new RuntimeException("Hábito não encontrado com o ID:" + id);
        }
    }

    public void edit(Long id, EditHabitDTO dto) {
        Habit habit = habitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hábito não encontrado com o ID:" + id));

        if (dto.getName() != null) {
            habit.setName(dto.getName());
        }

        if (dto.getId_type() != null) {
            habit.setTypeHabit(typeHabitRepository.getReferenceById(dto.getId_type()));
        }

        habitRepository.save(habit);
    }

    public List<ResponseHabitDTO> getAllByUser(User user) {
        return habitRepository.findAllByUser_Id(user.getId()).stream()
                .map(h -> new ResponseHabitDTO(h.getId(), h.getName(), h.getTypeHabit().getName()))
                .collect(Collectors.toList());
    }
}
