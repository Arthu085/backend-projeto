package com.example.backend_projeto.controller.habit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.example.backend_projeto.dto.habit.CreateHabitDTO;
import com.example.backend_projeto.dto.habit.EditHabitDTO;
import com.example.backend_projeto.dto.habit.ResponseHabitDTO;
import com.example.backend_projeto.models.User;
import com.example.backend_projeto.service.habit.HabitService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/habit")
public class HabitController {

    @Autowired
    HabitService habitService;

    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody CreateHabitDTO dto, @AuthenticationPrincipal User user) {
        habitService.create(dto, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        habitService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<Void> edit(@PathVariable Long id, @RequestBody EditHabitDTO dto) {
        habitService.edit(id, dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("fetch")
    public ResponseEntity<List<ResponseHabitDTO>> getHabitsByUser(@AuthenticationPrincipal User user) {
        List<ResponseHabitDTO> habits = habitService.getAllByUser(user);
        return ResponseEntity.ok(habits);
    }

}
