package com.example.backend_projeto.dto.habit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseHabitDTO {
    private Long id;
    private String name;
    private String typeName;
    private Long idUser;
}
