package com.example.backend_projeto.service.google;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Serviço para integração com a API do Google AI (Gemini)
 */
@Service
public class GoogleAIService {

    @Value("${google.ai.api.key}")
    private String apiKey;

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";
    private static final Gson gson = new Gson();

    /**
     * Função para obter uma sugestão de hábito do Google Gemini com base em dados
     * do usuário
     * 
     * @param nome            - Nome do usuário
     * @param cidade          - Cidade onde o usuário mora
     * @param estadoEmocional - Como o usuário está se sentindo
     * @param clima           - Condição climática atual
     * @return String - Sugestão de hábito
     */
    public String getSugestaoHabito(String nome, String cidade, String estadoEmocional, String clima) {
        try {
            // Construindo o prompt completo
            String mensagem = String.format(
                    "Como um assistente especializado em bem-estar e desenvolvimento de hábitos saudáveis, " +
                            "me dê UMA sugestão de hábito saudável.\n\n" +
                            "Meu nome é %s, moro em %s, estou me sentindo %s e o clima está %s.\n\n" +
                            "A sugestão deve ser curta, específica e motivacional (não colocar *).",
                    nome, cidade, estadoEmocional, clima);

            // Fazendo a requisição para a API do Google
            String response = sendRequestToGemini(mensagem, 0.7, 150);

            // Processando a resposta
            JsonObject jsonResponse = gson.fromJson(response, JsonObject.class);
            return jsonResponse
                    .getAsJsonArray("candidates")
                    .get(0).getAsJsonObject()
                    .getAsJsonObject("content")
                    .getAsJsonArray("parts")
                    .get(0).getAsJsonObject()
                    .get("text").getAsString();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(
                    "Não foi possível obter uma sugestão neste momento. Tente novamente mais tarde.");
        }
    }

    /**
     * Função para analisar o sentimento com base na descrição do usuário
     * 
     * @param descricao - Texto inserido pelo usuário descrevendo seu dia
     * @return SentimentoDTO - Análise de sentimento
     */
    public SentimentoDTO analisarSentimento(String descricao) {
        try {
            // Configuração do prompt para análise de sentimento
            String promptAnalise = String.format(
                    "Analise o seguinte texto e retorne um objeto JSON com as propriedades: \n" +
                            "- sentimento (positivo, neutro, negativo)\n" +
                            "- estadoEmocional (uma palavra que descreva a emoção predominante)\n\n" +
                            "Texto para análise: \"%s\"\n\n" +
                            "Retorne apenas o objeto JSON sem explicações adicionais.",
                    descricao);

            // Fazendo a requisição para a API do Google
            String response = sendRequestToGemini(promptAnalise, 0.3, 100);

            // Processando a resposta
            JsonObject jsonResponse = gson.fromJson(response, JsonObject.class);
            String textoResposta = jsonResponse
                    .getAsJsonArray("candidates")
                    .get(0).getAsJsonObject()
                    .getAsJsonObject("content")
                    .getAsJsonArray("parts")
                    .get(0).getAsJsonObject()
                    .get("text").getAsString();

            // Extrair apenas o JSON se houver texto adicional
            String jsonString = textoResposta;
            if (textoResposta.contains("{") && textoResposta.contains("}")) {
                jsonString = textoResposta.substring(
                        textoResposta.indexOf("{"),
                        textoResposta.lastIndexOf("}") + 1);
            }

            return gson.fromJson(jsonString, SentimentoDTO.class);

        } catch (Exception e) {
            e.printStackTrace();
            return new SentimentoDTO("neutro", "indeterminado");
        }
    }

    /**
     * Método auxiliar para enviar requisições para a API do Gemini
     */
    private String sendRequestToGemini(String prompt, double temperature, int maxOutputTokens) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Construindo o corpo da requisição
        JsonObject requestBody = new JsonObject();

        // Configurações de geração
        JsonObject generationConfig = new JsonObject();
        generationConfig.addProperty("temperature", temperature);
        generationConfig.addProperty("maxOutputTokens", maxOutputTokens);
        requestBody.add("generationConfig", generationConfig);

        // Conteúdo do prompt
        JsonObject contentObj = new JsonObject();
        JsonObject part = new JsonObject();
        part.addProperty("text", prompt);

        JsonArray parts = new JsonArray();
        parts.add(part);

        contentObj.addProperty("role", "user");
        contentObj.add("parts", parts);

        JsonArray contents = new JsonArray();
        contents.add(contentObj);

        requestBody.add("contents", contents);

        // Enviando a requisição com a chave API na URL
        String url = GEMINI_API_URL + "?key=" + apiKey;
        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);

        return restTemplate.postForObject(url, entity, String.class);
    }

    // Classe interna para representar o resultado da análise de sentimento
    public static class SentimentoDTO {
        private String sentimento;
        private String estadoEmocional;

        public SentimentoDTO() {
        }

        public SentimentoDTO(String sentimento, String estadoEmocional) {
            this.sentimento = sentimento;
            this.estadoEmocional = estadoEmocional;
        }

        public String getSentimento() {
            return sentimento;
        }

        public void setSentimento(String sentimento) {
            this.sentimento = sentimento;
        }

        public String getEstadoEmocional() {
            return estadoEmocional;
        }

        public void setEstadoEmocional(String estadoEmocional) {
            this.estadoEmocional = estadoEmocional;
        }
    }
}