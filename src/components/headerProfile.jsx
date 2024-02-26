import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { obterDadosMeteorologicosAtuais } from "../services/climaService";

export default function HeaderProfile() {
  const navigation = useNavigation();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await obterDadosMeteorologicosAtuais();
        setWeatherData(data);
      } catch (error) {
        console.error('Erro ao obter dados meteorológicos atuais:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,55,104,1)', 'transparent']}
        style={styles.background}
      />
      <View style={styles.containerProfile}>
        <View style={styles.containerProfileTexts}>
         
          {weatherData && (
            <Text style={styles.textClima}>{`${weatherData.weather_description}, ${weatherData.temperatura}º`}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.photoAvatar} onPress={() => navigation.openDrawer()}>
          <View style={styles.avatar}>
            <Image
              source={require("../../assets/thiago-perfil.png")}
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: 200,
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
    top: -13,
    left: 0,
    zIndex: 2000,
    paddingHorizontal: 20,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 400,
    height: '120%',
  },
  containerProfile: {
    padding: 15,
    flexDirection: 'row',
    gap: 10
  },
  containerProfileTexts: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textName: {
    fontSize: 20,
    color: '#fff',
    marginTop: -5
  },
  textClima: {
    fontSize: 15,
    color: '#DCEBF3',
  },
  photoAvatar: {
    width: 50,
    height: 50,
    backgroundColor: '#2887DF',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 42,
    height: 42,
    backgroundColor: '#fff',
    borderRadius: 100
  }
});
