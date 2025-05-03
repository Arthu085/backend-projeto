// Google AI Integration - Versão Corrigida
// Arquivo: src/API/google.js

/**
 * Configuração do cliente Google GenAI para Gemini
 * Documentação: https://ai.google.dev/docs
 */

// Importe a biblioteca necessária para a API do Google
// Nota: Você precisará instalar a biblioteca com: npm install @google/generative-ai
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicialize o cliente Google GenAI com sua chave de API
// IMPORTANTE: Esta é a chave API do Google AI Studio (não confundir com outras chaves do Google Cloud)
const API_KEY = "AIzaSyALaC2wenJQ8MCwEBMO7H3dkkh2wuHtBVM"; // 👈 Substitua por sua chave API

// Inicialize o cliente Google GenAI
const genAI = new GoogleGenerativeAI(API_KEY);

// Modelo a ser utilizado
const MODEL_NAME = "gemini-2.0-flash"; // Modelo mais rápido disponível atualmente

/**
 * Função para obter uma sugestão de hábito do Google Gemini com base em dados do usuário
 * @param {string} nome - Nome do usuário
 * @param {string} cidade - Cidade onde o usuário mora
 * @param {string} estadoEmocional - Como o usuário está se sentindo
 * @param {string} clima - Condição climática atual
 * @returns {Promise<string>} - Sugestão de hábito
 */
export const getSugestaoHabito = async (nome, cidade, estadoEmocional, clima) => {
  try {
    // Obter o modelo
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Construindo o prompt completo com instruções do sistema incorporadas no prompt
    const mensagem = `
    Como um assistente especializado em bem-estar e desenvolvimento de hábitos saudáveis, me dê UMA sugestão de hábito saudável.
    
    Meu nome é ${nome}, moro em ${cidade}, estou me sentindo ${estadoEmocional} e o clima está ${clima}.
    
    A sugestão deve ser curta, específica e motivacional.
    `;
   
    // Configuração da geração
    const generationConfig = {
      temperature: 0.7,
      maxOutputTokens: 150,
    };
    
    // Fazendo a requisição direta para o modelo Gemini (sem usar chat)
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: mensagem }] }],
      generationConfig,
    });
    
    // Extraindo a resposta do modelo
    return result.response.text();
    
  } catch (error) {
    console.error('Erro ao obter sugestão de hábito:', error);
    throw new Error('Não foi possível obter uma sugestão neste momento. Tente novamente mais tarde.');
  }
};

/**
 * Função para analisar o sentimento com base na descrição do usuário
 * @param {string} descricao - Texto inserido pelo usuário descrevendo seu dia
 * @returns {Promise<Object>} - Análise de sentimento
 */
export const analisarSentimento = async (descricao) => {
  try {
    // Obter o modelo
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Configuração do prompt para análise de sentimento
    const promptAnalise = `
    Analise o seguinte texto e retorne um objeto JSON com as propriedades: 
    - sentimento (positivo, neutro, negativo)
    - estadoEmocional (uma palavra que descreva a emoção predominante)
    
    Texto para análise: "${descricao}"
    
    Retorne apenas o objeto JSON sem explicações adicionais.
    `;
    
    // Configuração da geração
    const generationConfig = {
      temperature: 0.3,
      maxOutputTokens: 100,
    };
    
    // Fazendo a requisição para o modelo Gemini
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: promptAnalise }] }],
      generationConfig,
    });
    
    // Extrair resposta e converter para objeto
    const textoResposta = result.response.text();
    
    // Tentar extrair apenas o JSON se houver texto adicional
    let jsonString = textoResposta;
    if (textoResposta.includes('{') && textoResposta.includes('}')) {
      jsonString = textoResposta.substring(
        textoResposta.indexOf('{'),
        textoResposta.lastIndexOf('}') + 1
      );
    }
    
    return JSON.parse(jsonString);
    
  } catch (error) {
    console.error('Erro ao analisar sentimento:', error);
    return { sentimento: 'neutro', estadoEmocional: 'indeterminado' };
  }
};