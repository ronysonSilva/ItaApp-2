import axios from 'axios';

// Servidor API Flask
const baseUrl = 'http://45.170.17.10:5000';

// API GET Dados Meterologicos Atuais
export const obterDadosMeteorologicosAtuais = async () => {
  try {
    const url = `${baseUrl}/clima`;

    // Realiza a requisição GET para a URL
    const response = await axios.get(url);

    // Verifica a resposta da API
    console.log('Resposta da API:', response.data);

    // Retorne os dados ou faça qualquer outra manipulação necessária aqui
    return response.data;
  } catch (error) {
    // Tratamento dos erros aqui
    console.error('Erro ao obter dados meteorológicos atuais da API:', error);
    throw error;
  }

  // Campos para consumir a API Dados Meterologicos Atuais

  // humidity
  // temp_max
  // temp_min
  // temperatura
  // weather_description
  // weather_icon
  // weather_id
  // wind_speed

};

//API GET Previsão do tempo semanal 
export const obterPrevisaoSemanal = async () => {
  try {
    const url = `${baseUrl}/previsao_tempo`;

    // Realiza a requisição GET para a URL
    const response = await axios.get(url);

    // Verifica a resposta da API
    console.log('Resposta da API de previsão semanal:', response.data);

    // Retorne os dados ou faça qualquer outra manipulação necessária aqui
    return response.data;
  } catch (error) {
    // Tratamento de erro
    console.error('Erro ao obter previsão semanal:', error);
    throw error;
  }

  // Campos para consumir a API Previsão do tempo Semanal

  // data
  // frase_alvorecer	
  // frase_manha	
  // frase_noite	
  // frase_reduzida	
  // frase_tarde	
  // icone_alvorecer	
  // icone_manha	
  // icone_noite
  // icone_tarde	
  // id	
  // pressao
  // probabilidde_chuva	
  // sensacao_termica_max	
  // sensacao_termica_min	
  // temperatura_max	
  // temperatura_min	
  // texto_en	
  // texto_es	
  // texto_pt	
  // umidade_max	
  // umidade_min	
  // uv_max	
  // velocidade_vento_max	
  // velocidade_vento_min	
};