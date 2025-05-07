package com.example.backend_projeto.dto.google;

/**
 * DTO para a requisição de sugestão de hábito
 */
public class HabitoRequestDTO {
    private String nome;
    private String cidade;
    private String estadoEmocional;
    private String clima;

    // Construtores
    public HabitoRequestDTO() {
    }

    public HabitoRequestDTO(String nome, String cidade, String estadoEmocional, String clima) {
        this.nome = nome;
        this.cidade = cidade;
        this.estadoEmocional = estadoEmocional;
        this.clima = clima;
    }

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

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