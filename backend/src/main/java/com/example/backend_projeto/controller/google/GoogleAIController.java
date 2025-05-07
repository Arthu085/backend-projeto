package com.example.backend_projeto.controller.google;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend_projeto.dto.google.HabitoRequestDTO;
import com.example.backend_projeto.dto.google.SentimentoRequestDTO;
import com.example.backend_projeto.models.User;
import com.example.backend_projeto.service.google.GoogleAIService;
import com.example.backend_projeto.service.google.GoogleAIService.SentimentoDTO;

/**
 * Controller para expor os endpoints da API do Google AI
 */
@RestController
@RequestMapping("/api/google-ai")
public class GoogleAIController {

    @Autowired
    private GoogleAIService googleAIService;

    /**
     * Endpoint para obter uma sugestão de hábito personalizada
     *
     * @param request - Dados do usuário para personalização
     * @return ResponseEntity - Resposta com a sugestão
     */
    @PostMapping("/sugestao-habito")
    public ResponseEntity<String> getSugestaoHabito(@RequestBody HabitoRequestDTO request,
            @AuthenticationPrincipal User user) {
        try {
            String sugestao = googleAIService.getSugestaoHabito(
                    user.getName(),
                    user.getCity(),
                    request.getEstadoEmocional(),
                    request.getClima());
            return ResponseEntity.ok(sugestao);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Endpoint para analisar o sentimento de um texto
     *
     * @param request - Texto para análise
     * @return ResponseEntity - Resposta com a análise de sentimento
     */
    @PostMapping("/analise-sentimento")
    public ResponseEntity<SentimentoDTO> analisarSentimento(@RequestBody SentimentoRequestDTO request) {
        try {
            SentimentoDTO analise = googleAIService.analisarSentimento(request.getDescricao());
            return ResponseEntity.ok(analise);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new SentimentoDTO("neutro", "indeterminado"));
        }
    }
}