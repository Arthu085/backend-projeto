package com.example.backend_projeto.controller.habit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.example.backend_projeto.dto.habit.CreateHabitDTO;
import com.example.backend_projeto.models.User;
import com.example.backend_projeto.service.habit.HabitService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

}
