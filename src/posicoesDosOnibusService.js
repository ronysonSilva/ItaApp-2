import axios from 'axios';
import { encode } from 'base-64';

// Servidor API Flask
const baseUrl = 'http://45.170.17.10:9092';

export const obterPosicoesDosOnibus = async () => {
  // URL da API
  const url = `${baseUrl}/api/positions`;

  // Credenciais de autenticação
  const usuario = "talmeida21986@gmail.com";
  const senha = "<n/93keN*53B$]0ll%kr!KL/W}r8kg";

  // Configuração da autenticação básica usando Headers e base-64
  const headers = {
    Authorization: `Basic ${encode(`${usuario}:${senha}`)}`,
  };

  try {
    // Realiza a requisição à API com as credenciais incluídas nos headers
    const response = await axios.get(url, { headers });

    // Exibe os dados das posições dos ônibus
    // console.log(response.data);

    // Retorna os dados para que possam ser utilizados em outros lugares, se necessário
    return response.data;
  } catch (error) {
    // Exibe a mensagem de erro
    console.error("Erro ao buscar posições dos ônibus:", error);
    throw error; // Lança o erro para que possa ser tratado no local onde a função é chamada
  }

  // Campos para consumir a API de Posiçõe dos Onibus Tarifa Zero

  // id
  // attributes
  // batteryLevel
  // distance
  // totalDistance
  // motion
  // deviceId
  // protocol
  // serverTime
  // deviceTime
  // fixTime
  // outdated
  // valid
  // latitude
  // longitude
  // altitude
  // speed
  // course
  // address
  // accuracy
  // network
  // geofenceIds
};



