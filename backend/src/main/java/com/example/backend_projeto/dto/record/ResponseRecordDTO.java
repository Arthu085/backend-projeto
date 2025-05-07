package com.example.backend_projeto.dto.record;

import java.time.LocalDateTime;

public record ResponseRecordDTO(Long id,
        String userName,
        String habitName,
        LocalDateTime datePerformed) {

}
