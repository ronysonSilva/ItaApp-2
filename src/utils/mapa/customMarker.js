import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { styles } from "../../../styles";


// perfil 
const CustomMarker = ({ title }) => {
    return (
      <View style={styles.photoAvatar}>
        <View style={styles.avatar}>
          <Image
            source={require("../../../assets/thiago-perfil.png")}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };
  
  const markerStyles = StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: "white",
    },
  });

export default CustomMarker;
