import axios from 'axios';

// Servidor API Flask
const baseUrl = 'http://45.170.17.10:5000';

// API GET Dados Meterologicos Atuais
export const obterPontoDeOnibus = async () => {
  try {
    const url = `${baseUrl}/ponto_onibus`;

    // Realiza a requisição GET para a URL
    const response = await axios.get(url);

    // Verifica a resposta da API
    console.log('Resposta da API:', response.data);

    // Retorne os dados ou faça qualquer outra manipulação necessária aqui
    return response.data;
  } catch (error) {
    // Tratamento dos erros aqui
    console.error('Erro ao obter dados de ponto de Onibus da API:', error);
    throw error;
  }

  // Campos para consumir a API Dados de Ponto de Onibus

  // id
  // rota
  // numero_ponto
  // latitude
  // longitude
  // data_criacao

};
