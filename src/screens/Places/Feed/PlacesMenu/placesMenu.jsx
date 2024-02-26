import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import placesData from "../../../../../assets/places.json";

export default function PlacesMenu() {
  const [colorButtonDefault, setColorButtonDefault] = useState("bg-slate-500");
  const [places, setPlaces] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setPlaces(placesData.lugares);
    setColorButtonDefault("bg-slate-500");
  }, []);

  const handlePlacePress = (place) => {
    setSelectedPlace(place);
    setSelectedCategory(null); // Limpa a categoria selecionada
    // Definir a cor baseada no tipo de lugar selecionado
    switch (place.nome) {
      case "Todos":
        setColorButtonDefault("bg-slate-800");
        break;
      case "Prefeitura":
        setColorButtonDefault("bg-[#3F8AC1]");
        break;
      case "Natureza":
        setColorButtonDefault("bg-[#59C13F]");
        break;
      case "Hotel":
        setColorButtonDefault("bg-[#D29B32]");
        break;
      default:
        setColorButtonDefault("bg-slate-500"); // Cor padrão
        break;
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View className="flex-1 w-full items-start justify-start px-5 -top-10">
      <View className="flex-row w-full justify-between items-center pr-1">
        {places &&
          places.map((place, key) => (
            <View key={key}>
              <TouchableOpacity
                onPress={() => handlePlacePress(place)}
                className="bg-white opacity-90 rounded-full items-center justify-center p-1"
                style={{ elevation: 2 }}
              >
                <View
                  style={{ elevation: 20 }}
                  className={`${
                    selectedPlace === place
                      ? colorButtonDefault
                      : "bg-slate-500"
                  } rounded-full h-[75px] w-[75px] items-center justify-center`}
                >
                  <Image
                    source={{ uri: place.icone }}
                    style={{ height: "50%", width: "50%", resizeMode: "cover" }}
                    className="rounded-t-lg"
                  />
                </View>
                <View className="my-3">
                  <Text className="text-xs font-semibold text-slate-500 break-words text-center">
                    {place.nome}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </View>
      {selectedPlace && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="h-14 w-screen -ml-4 pl-4"
        >
          {selectedPlace.categoria.map((categoria, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategoryPress(categoria)}
              style={{ marginRight: 10 }}
            >
              <View
                className={`p-1 mt-3 rounded-full h-8 justify-center ${
                  selectedCategory === categoria
                    ? "bg-slate-500"
                    : "bg-slate-300"
                }`}
              >
                <Text
                  className={`${
                    selectedCategory === categoria
                      ? "text-white"
                      : "text-slate-600"
                  } mx-3`}
                >
                  {categoria.nome}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <ScrollView>
        {/* Renderizar os posts */}
        {selectedCategory
          ? selectedCategory.posts.map((post, index) => (
              <View key={index}>
                <Text>{post.nome}</Text>
                {/* Renderizar outros detalhes do post conforme necessário */}
              </View>
            ))
          : selectedPlace &&
            selectedPlace.categoria.map((categoria, index) =>
              categoria.posts.map((post, index) => (
                <View key={index}>
                  <Text>{post.nome}</Text>
                  {/* Renderizar outros detalhes do post conforme necessário */}
                </View>
              ))
            )}
      </ScrollView>
    </View>
  );
}
