import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Image } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import { styles } from "../../styles";
import customMapStyle from "../../assets/mapStyles/customMapStyleLight.json";
import HeaderProfile from "../components/headerProfile";
import FooterApps from "../components/footerApps";
import { obterPosicoesDosOnibus } from "../services/posicoesDosOnibusService";
import FunctionMap from "../utils/mapa/functionMap";
import CustomMarker from '../utils/mapa/customMarker';


export default function App() {
  const [location, setLocation] = useState(null);
  const [busPositions, setBusPositions] = useState([]);
  const [showBusMarkers, setShowBusMarkers] = useState(false);
  const [busStops, setBusStops] = useState([]);
  const [showColetaDeLixoMarkers, setShowColetaDeLixoMarkers] = useState(false);
  const [coletaDeLixoPositions, setColetaDeLixoPositions] = useState([]);

  const mapRef = useRef(null);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
    obterPosicoesDosOnibus()
      .then((positions) => setBusPositions(positions))
      .catch((error) => console.error("Erro ao obter posições dos ônibus:", error));
  }, []);

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (response) => {
        setLocation(response);
        mapRef.current?.animateCamera({
          pitch: 100,
          center: response.coords,
        });
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: -22.8623,
              longitude: -43.7782,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            customMapStyle={customMapStyle}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            >
              <CustomMarker />
            </Marker>

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
                  source={require("../../assets/ronylson.jpg")}
                  style={styles.avatar}
                  resizeMode="contain"
                />
              </Marker>
            ))}

            {showColetaDeLixoMarkers &&
              coletaDeLixoPositions.map(async (position, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: position.latitude,
                    longitude: position.longitude,
                  }}
                >
                  <Image
                    source={{ uri: position.icon_url }}
                    style={styles.avatar}
                    resizeMode="contain"
                  />
                </Marker>
              ))}
          </MapView>
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
      <StatusBar style="light" />
    </View>
  );
}