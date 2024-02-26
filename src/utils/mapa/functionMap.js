import { obterPontoDeOnibus } from "../../services/pontoDeOnibusService";
import { obterPosicoesColetaDeLixo } from "../../services/posicoesColetaDeLixoService";
//import { obterPosicoesDosOnibus } from "../../services/posicoesDosOnibusService";
  
  class FunctionMap {


    // onibus render
    static async handleOnibusGratisPress(setShowBusMarkers, setShowColetaDeLixoMarkers, setBusStops) {
      try {
        // Atualiza o estado para mostrar os marcadores dos ônibus
        setShowBusMarkers(true);
        setShowColetaDeLixoMarkers(false); // Limpa coletaLixo
        // Obtém os dados dos pontos de ônibus
        const pontosDeOnibus = await obterPontoDeOnibus();
        setBusStops(pontosDeOnibus);
      } catch (error) {
        console.error("Erro ao obter dados dos pontos de ônibus:", error);
      }
    }
  


    // coleta render
    static async handleColetaDeLixoPress(setShowBusMarkers, setBusStops, setShowColetaDeLixoMarkers, setColetaDeLixoPositions) {
      try {
        // Limpa os marcadores dos ônibus e pontos de ônibus
        setShowBusMarkers(false);
        setBusStops([]);
        // Atualiza o estado para mostrar os marcadores da Coleta de Lixo
        setShowColetaDeLixoMarkers(true);
        // Obtém os dados da Coleta de Lixo
        const coletaDeLixoPositions = await obterPosicoesColetaDeLixo();
        setColetaDeLixoPositions(coletaDeLixoPositions);
        // Extrai as coordenadas para a polilinha da Coleta de Lixo
        const coletaDeLixoPolyline = coletaDeLixoPositions.map((position) => ({
          latitude: position.latitude,
          longitude: position.longitude,
        }));
        // Atualiza o estado da polilinha da Coleta de Lixo
        // setColetaDeLixoPolyline(coletaDeLixoPolyline);
      } catch (error) {
        console.error("Erro ao obter dados da Coleta de Lixo:", error);
      }
    }
  }
  
  export default FunctionMap;
  