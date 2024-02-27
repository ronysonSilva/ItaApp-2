// Importações necessárias do React e React Native
import React, { useEffect, useState, useRef, memo } from "react";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { View, Image } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";

// Importações de estilos, componentes e funções utilitárias
import { styles } from "../../styles";
import customMapStyle from "../../assets/mapStyles/customMapStyleLight.json";
import HeaderProfile from "../components/headerProfile";
import FooterApps from "../components/footerApps";
import { obterPosicoesDosOnibus } from "../services/posicoesDosOnibusService";
import FunctionMap from "../utils/mapa/functionMap";
import CustomMarker from '../utils/mapa/customMarker';

// Componente principal da aplicação
const App = memo(() => {
  // Estados para armazenar dados importantes
  const [location, setLocation] = useState(null);
  const [busPositions, setBusPositions] = useState([]);
  const [showBusMarkers, setShowBusMarkers] = useState(false);
  const [busStops, setBusStops] = useState([]);
  const [showColetaDeLixoMarkers, setShowColetaDeLixoMarkers] = useState(false);
  const [coletaDeLixoPositions, setColetaDeLixoPositions] = useState([]);

  // Referência para o mapa para manipulação direta
  const mapRef = useRef(null);

  // Função para solicitar permissões de localização e atualizar o mapa para a posição atual
  const requestLocationPermissions = async () => {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      mapRef.current?.animateCamera({
        center: currentPosition.coords,
      });
    }
  };

  // Efeito que é executado quando o componente é montado
  useEffect(() => {
    // Solicita permissões de localização e obtém as posições dos ônibus
    requestLocationPermissions();
    obterPosicoesDosOnibus()
      .then((positions) => setBusPositions((prevPositions) => [...prevPositions, ...positions]))
      .catch((error) => console.error("Erro ao obter posições dos ônibus:", error));
  }, []);

  // Efeito que é executado quando há mudanças na posição do dispositivo
  useEffect(() => {
    // Inicia o acompanhamento da posição e atualiza o mapa
    const positionWatcher = watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (response) => {
        setLocation(response);
        mapRef.current?.animateCamera({
          center: response.coords,
        });
      }
    );

    // Remove o acompanhamento quando o componente é desmontado
    return () => {
      if (positionWatcher) {
        positionWatcher.remove();
      }
    };
  }, []);

  // Renderização do componente principal
  return (
    <View style={styles.container}>
      {location && (
        <>
          {/* Componente de mapa que exibe marcadores e informações */}
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            customMapStyle={customMapStyle}
          >
            {/* Marcador que representa a posição atual do usuário */}
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            >
              <CustomMarker />
            </Marker>

            {/* Marcadores de ônibus, paradas e coleta de lixo */}
            {showBusMarkers &&
              busPositions.map((position, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: position.latitude,
                    longitude: position.longitude,
                  }}
                >
                  <Image
                    source={require("../../assets/wallace.png")}
                    style={styles.avatar}
                    resizeMode="contain"
                  />
                </Marker>
              ))}

            {busStops.map((ponto, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: ponto.latitude,
                  longitude: ponto.longitude,
                }}
              >
                <Image
                  source={{ uri: 'http://45.170.17.10:5000/imagem/icon-ponto.png' }}
                  style={styles.avatar}
                  resizeMode="contain"
                />
              </Marker>
            ))}

            {showColetaDeLixoMarkers &&
              coletaDeLixoPositions.map((position, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: position.latitude,
                    longitude: position.longitude,
                  }}
                >
                  <Image
                    source={{ uri: 'http://45.170.17.10:5000/imagem/icon-caminhao-lixo.png' }}
                    style={styles.avatar}
                    resizeMode="contain"
                  />
                </Marker>
              ))}
          </MapView>

          {/* Componentes de rodapé e cabeçalho */}
          <FooterApps 
            onOnibusGratisPress={() => FunctionMap.handleOnibusGratisPress(
              setShowBusMarkers,
              setShowColetaDeLixoMarkers,
              setBusStops
            )}
            onColetaDeLixoPress={() => FunctionMap.handleColetaDeLixoPress(
              setShowBusMarkers,
              setBusStops,
              setShowColetaDeLixoMarkers,
              setColetaDeLixoPositions
            )}
          />
          <HeaderProfile />
        </>
      )}
      {/* Barra de status na parte superior da tela */}
      <StatusBar style="light" />
    </View>
  );
});

// Exporta o componente principal
export default App;