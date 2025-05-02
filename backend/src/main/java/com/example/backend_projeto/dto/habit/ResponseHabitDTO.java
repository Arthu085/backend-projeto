package com.example.backend_projeto.dto.habit;

public class ResponseHabitDTO {
    private Long id;
    private String name;
    private String typeName;

    public ResponseHabitDTO(Long id, String name, String typeName) {
        this.id = id;
        this.name = name;
        this.typeName = typeName;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getTypeName() {
        return typeName;
    }
}
