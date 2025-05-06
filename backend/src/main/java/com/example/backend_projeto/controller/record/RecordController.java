package com.example.backend_projeto.controller.record;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend_projeto.dto.record.CreateRecordDTO;
import com.example.backend_projeto.models.User;
import com.example.backend_projeto.service.record.RecordService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
}
