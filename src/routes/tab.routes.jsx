import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Mapa from "../screens/Mapa";
import Dashboard from "../screens/Prefeitura";
import Line from "../components/line";
import { useNavigation } from "@react-navigation/native";
import Places from "../screens/Places";


const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const [showFooter, setShowFooter] = useState(true);

  // Navegar para a rota mapa
  const navigation = useNavigation();

  const openTabMap = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "darkred",
          tabBarInactiveTintColor: "lightcoral",
          tabBarLabelStyle: {
            display: "none",
          },
          // Ajuste de altura:
          tabBarStyle: {
            backgroundColor: "",
            height: "7%", // Altura da barra de guias em porcentagem
            flexDirection: "row", // Organiza as guias na horizontal
          },
          screenStyle: {
            flex: 1, // Faz com que as guias ocupem todo o espaço disponível
          },
          tabBarActiveBackgroundColor: "rgb(14 165 233)",
          tabBarInactiveBackgroundColor: "#003768",
        }}
      >
        <Tab.Screen
          name="mapa"
          component={Mapa}
          options={({ route }) => ({
            tabBarIcon: ({ size, focused }) => null, // Oculta o ícone definindo como null
            tabBarButton: () => null, // Oculta o contêiner da guia
            tabBarStyle: {
              backgroundColor: '#c3c3', // Optional background color
              overflow: 'hidden', // Ensures rounded corners are displayed correctly
            },
          })}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              setShowFooter(true);
            },
          })}
        />
        <Tab.Screen
          name="places"
          component={Places}
          options={({ route }) => ({
            tabBarIcon: ({ size, focused }) => (
              <View style={styles.tabBarIconContainer}>
                <Feather
                  name={focused ? "home" : "home"}
                  color={focused ? "#fff" : "#AFC7DC"}
                  size={size}
                />
              </View>
            ),
            tabBarStyle: {
              backgroundColor: '#c3c3', // Optional background color
              overflow: 'hidden', // Ensures rounded corners are displayed correctly
            },
          })}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              setShowFooter(true);
            },
          })}
        />
        <Tab.Screen
          name="dashboard"
          component={Dashboard}
          options={({ route }) => ({
            tabBarIcon: ({ size, focused }) => (
              <View style={styles.tabBarIconContainer}>
                <Feather
                  name={focused ? "menu" : "menu"}
                  color={focused ? "#fff" : "#AFC7DC"}
                  size={size}
                />
              </View>
            ),
            tabBarStyle: {
              backgroundColor: '#c3c3', // Optional background color
              overflow: 'hidden', // Ensures rounded corners are displayed correctly
            },
          })}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              setShowFooter(false);
            },
          })}
        />
      </Tab.Navigator>
      {/* {showFooter && <Line />} */}
      <TouchableOpacity style={styles.buttonMaps} onPress={() => openTabMap("mapa")}>
        <View style={{ elevation: 15, width: 47, height: 47, backgroundColor: 'rgb(14 165 233)', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
          <Feather name="map" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({
  tabBarIconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderTopWidth: 1,
    borderTopColor: "#003768",
  },
  buttonMaps: {
    position: 'absolute',
    backgroundColor: '#fff',
    height: 53,
    width: 53,
    bottom: 25,
    left: '50%',
    right: '50%',
    marginLeft: -25,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  }
});
