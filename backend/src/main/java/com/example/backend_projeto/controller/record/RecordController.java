package com.example.backend_projeto.controller.record;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend_projeto.dto.record.CreateRecordDTO;
import com.example.backend_projeto.dto.record.ResponseRecordDTO;
import com.example.backend_projeto.models.User;
import com.example.backend_projeto.service.record.RecordService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/record")
public class RecordController {

    @Autowired
    RecordService recordService;

    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody CreateRecordDTO dto, @AuthenticationPrincipal User user) {
        recordService.create(dto, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        recordService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/fetch")
    public ResponseEntity<List<ResponseRecordDTO>> getRecordsByUser(@AuthenticationPrincipal User user) {
        List<ResponseRecordDTO> record = recordService.getAllByUser(user);
        return ResponseEntity.ok(record);
    }

}
