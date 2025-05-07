package com.example.backend_projeto.controller.about;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sobre")
public class AboutController {

    @GetMapping()
    public ResponseEntity<Map<String, Object>> getSobre() {
        Map<String, Object> response = Map.of(
                "integrantes", List.of("Arthur Ghizi", "Eduardo Domingos"),
                "nome_projeto", "Equilibrio AI");
        return ResponseEntity.ok(response);
    }
}
