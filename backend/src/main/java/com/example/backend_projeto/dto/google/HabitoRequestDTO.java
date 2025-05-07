package com.example.backend_projeto.dto.google;

/**
 * DTO para a requisição de sugestão de hábito
 */
public class HabitoRequestDTO {
    private String estadoEmocional;
    private String clima;

    // Construtores
    public HabitoRequestDTO() {
    }

    public HabitoRequestDTO(String nome, String cidade, String estadoEmocional, String clima) {
        this.estadoEmocional = estadoEmocional;
        this.clima = clima;
    }

    // Getters e Setters

    public String getEstadoEmocional() {
        return estadoEmocional;
    }

    public void setEstadoEmocional(String estadoEmocional) {
        this.estadoEmocional = estadoEmocional;
    }

    public String getClima() {
        return clima;
    }

    public void setClima(String clima) {
        this.clima = clima;
    }
}