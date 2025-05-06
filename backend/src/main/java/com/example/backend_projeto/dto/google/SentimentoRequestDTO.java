package com.example.backend_projeto.dto;

/**
 * DTO para a requisição de análise de sentimento
 */
public class SentimentoRequestDTO {
    private String descricao;

    // Construtores
    public SentimentoRequestDTO() {}

    public SentimentoRequestDTO(String descricao) {
        this.descricao = descricao;
    }

    // Getters e Setters
    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}