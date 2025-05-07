// API/google.js - Interface de cliente para o GoogleAIService do backend

/**
 * Solicita uma sugestão de hábito personalizada com base nos dados do usuário
 * 
 * Integra com o endpoint do GoogleAIService.java
 * 
 * @param {string} nome - Nome do usuário
 * @param {string} cidade - Cidade onde o usuário mora
 * @param {string} estadoEmocional - Como o usuário está se sentindo
 * @param {string} clima - Condição climática atual
 * @returns {Promise<string>} Sugestão de hábito retornada pelo Google Gemini
 */
export const getSugestaoHabito = async (nome, cidade, estadoEmocional, clima) => {
  try {
    const token = localStorage.getItem("token"); // <-- Adicionado aqui

    // URL corrigida para corresponder ao endpoint definido no GoogleAIController
    const response = await fetch('http://localhost:8000/api/google-ai/sugestao-habito', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // <-- Adicionado aqui
      },
      body: JSON.stringify({
        nome,
        cidade,
        estadoEmocional,
        clima
      }),
    });

    if (!response.ok) {
      // Primeiro tente obter o texto da resposta
      const responseText = await response.text();
      let errorMessage = 'Erro ao obter sugestão';
      
      // Tente converter para JSON somente se parecer um JSON válido
      try {
        if (responseText.trim().startsWith('{')) {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        }
      } catch (jsonError) {
        console.error('Erro ao analisar resposta de erro:', jsonError);
        // Se falhar no parse, use o texto bruto como mensagem
        errorMessage = responseText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    // O GoogleAIController retorna diretamente a String, não um objeto JSON
    const responseText = await response.text();
    
    // Verificando se existe algum JSON no texto
    try {
      if (responseText.trim().startsWith('{')) {
        const data = JSON.parse(responseText);
        return data.sugestao || responseText;
      }
      return responseText; // Retorna o texto diretamente
    } catch (jsonError) {
      console.error('Erro ao analisar resposta JSON:', jsonError, 'Resposta bruta:', responseText);
      // Nesse caso, retornamos o texto bruto da resposta
      return responseText;
    }
  } catch (error) {
    console.error('Erro na API de sugestão de hábito:', error);
    throw error;
  }
};

/**
 * Analisa o sentimento com base na descrição do dia do usuário
 * 
 * Integra com o endpoint de análise de sentimento do GoogleAIService.java
 * 
 * @param {string} descricao - Texto descrevendo como está o dia do usuário
 * @returns {Promise<Object>} - Objeto contendo sentimento e estadoEmocional
 */
export const analisarSentimento = async (descricao) => {
  try {
    const token = localStorage.getItem("token"); // <-- Adicionado aqui

    // URL corrigida para corresponder ao endpoint definido no GoogleAIController
    const response = await fetch('/api/google-ai/analise-sentimento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // <-- Adicionado aqui
      },
      body: JSON.stringify({ descricao }),
    });

    if (!response.ok) {
      // Primeiro tente obter o texto da resposta
      const responseText = await response.text();
      let errorMessage = 'Erro na análise de sentimento';
      
      // Tente converter para JSON somente se parecer um JSON válido
      try {
        if (responseText.trim().startsWith('{')) {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        }
      } catch (jsonError) {
        console.error('Erro ao analisar resposta de erro:', jsonError);
        // Se falhar no parse, use o texto bruto como mensagem
        errorMessage = responseText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    // O GoogleAIController retorna um objeto SentimentoDTO como JSON
    const responseText = await response.text();
    
    try {
      return JSON.parse(responseText);
    } catch (jsonError) {
      console.error('Erro ao analisar resposta JSON:', jsonError, 'Resposta bruta:', responseText);
      // Retorna um objeto padrão em caso de erro de parsing
      return { sentimento: 'neutro', estadoEmocional: 'indeterminado' };
    }
  } catch (error) {
    console.error('Erro na API de análise de sentimento:', error);
    // Retorna um resultado padrão em caso de erro
    return { sentimento: 'neutro', estadoEmocional: 'indeterminado' };
  }
};
