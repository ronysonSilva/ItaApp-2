import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import placesData from "../../../../../assets/places.json";

export default function PlacesMenu() {
  const [colorButtonDefault, setColorButtonDefault] = useState("bg-slate-500");
  const [places, setPlaces] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setPlaces(placesData.lugares);
    setColorButtonDefault("bg-slate-500");
  }, []);

  const handlePlacePress = (place) => {
    setSelectedPlace(place);
    setSelectedCategory(null);
    setSelectedPost(null);
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
        setColorButtonDefault("bg-slate-500");
        break;
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setSelectedPost(null);
  };

  const handlePostPress = (post) => {
    setSelectedPost(post);
    setShowComments(!showComments); // Alternar a exibição dos comentários ao clicar em um post
  };

  const handleShowComments = () => {
    setShowComments(true);
  };

  const handleHideComments = () => {
    setShowComments(false);
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
                  className={`${selectedPlace === place
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
                className={`p-1 mt-3 rounded-full h-8 justify-center ${selectedCategory === categoria
                  ? "bg-slate-500"
                  : "bg-slate-300"
                  }`}
              >
                <Text
                  className={`${selectedCategory === categoria
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
        {selectedCategory ?
          selectedCategory.posts.map((post, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePostPress(post)}
              className="w-screen rounded-lg bg-white mb-4 h-auto"
            >
              <Image
                source={{ uri: post.imagem }}
                style={{ height: 300, width: "100%", resizeMode: "cover" }}
                className="rounded-t-lg"
              />
              <View className="">
                <Text className="text-lg font-bold text-slate-600 mx-3 my-3 mb-1 leading-6">{post.nome}</Text>
              </View>
              <View className="mx-3 mt-2 mb-3 pt-2 border-t-2 border-slate-200 flex-row">
                <Text className=" py-1 font-semibold text-slate-600 text-base mr-3">Curtir   |</Text>
                <Text className=" py-1 font-semibold text-slate-500 text-base">{post.likes}</Text>
              </View>
              {/* Exibir os comentários do post selecionado, se a opção de mostrar comentários estiver habilitada */}
              {selectedPost === post && showComments && (
                <View>
                  {/* Renderizar os comentários */}
                  {post.comentarios.map((comentario, commentIndex) => (
                    <View key={commentIndex} className="mx-3 mb-2">
                      <Text className="text-sm font-semibold text-slate-700">{comentario.usuario}</Text>
                      <Text className="text-sm text-slate-600">{comentario.texto}</Text>
                    </View>
                  ))}
                  {/* Botão para ocultar comentários */}
                  <TouchableOpacity onPress={() => handlePostPress(post)} style={{ alignItems: "center", marginBottom: 10 }}>
                    <Text style={{ color: "blue" }}>Ocultar comentários</Text>
                  </TouchableOpacity>
                </View>
              )}
              {/* Botão para mostrar comentários */}
              {!showComments && (
                <TouchableOpacity onPress={() => handlePostPress(post)} style={{ alignItems: "center", marginBottom: 10 }}>
                  <Text style={{ color: "blue" }}>Ver comentários ({post.comentarios.length})</Text>
                </TouchableOpacity>
              )}
              {/* Input para adicionar novo comentário */}
              <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
                <TextInput
                  placeholder="Adicione um comentário..."
                  value={newComment}
                  onChangeText={(text) => setNewComment(text)}
                  style={{ flex: 1, borderWidth: 1, borderColor: "gray", borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}
                />
                <TouchableOpacity onPress={handleShowComments} style={{ marginLeft: 10, backgroundColor: "blue", padding: 10, borderRadius: 5 }}>
                  <Text style={{ color: "white" }}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
          : selectedPlace &&
          selectedPlace.categoria.map((categoria, index) =>
            categoria.posts.map((post, index) => (
              <TouchableOpacity key={index} className="w-screen rounded-lg bg-white mb-4 h-auto">
                <Image
                  source={{ uri: post.imagem }}
                  style={{ height: 300, width: "100%", resizeMode: "cover" }}
                  className="rounded-t-lg"
                />
                <View className="">
                  <Text className="text-lg font-bold text-slate-600 mx-3 my-3 mb-1 leading-6">{post.nome}</Text>
                </View>
                <View className="mx-3 mt-2 mb-3 pt-2 border-t-2 border-slate-200 flex-row">
                  <Text className=" py-1 font-semibold text-slate-600 text-base mr-3">Curtir   |</Text>
                  <Text className=" py-1 font-semibold text-slate-500 text-base">{post.likes}</Text>
                </View>
                {/* Botão para mostrar/ocultar comentários */}
                {!showComments ? (
                  <TouchableOpacity onPress={handleShowComments} style={{ alignItems: "center", marginBottom: 10 }}>
                    <Text style={{ color: "blue" }}>Ver comentários ({post.comentarios.length})</Text>
                  </TouchableOpacity>
                ) : (
                  <View>
                    {/* Renderizar os comentários */}
                    {post.comentarios.map((comentario, index) => (
                      <View key={index} className="mx-3 mb-2">
                        <Text className="text-sm font-semibold text-slate-700">{comentario.usuario}</Text>
                        <Text className="text-sm text-slate-600">{comentario.texto}</Text>
                      </View>
                    ))}
                    {/* Botão para ocultar comentários */}
                    <TouchableOpacity onPress={handleHideComments} style={{ alignItems: "center", marginBottom: 10 }}>
                      <Text style={{ color: "blue" }}>Ocultar comentários</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {/* Input para adicionar novo comentário */}
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
                  <TextInput
                    placeholder="Adicione um comentário..."
                    value={newComment}
                    onChangeText={(text) => setNewComment(text)}
                    style={{ flex: 1, borderWidth: 1, borderColor: "gray", borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}
                  />
                  <TouchableOpacity onPress={handleShowComments} style={{ marginLeft: 10, backgroundColor: "blue", padding: 10, borderRadius: 5 }}>
                    <Text style={{ color: "white" }}>Adicionar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
      </ScrollView>
      <View className="w-screen items-center justify-center -ml-5 h-60">
        <Text className="text-center text-base text-slate-600 w-full">Voce ainda nao tem locais favoritos</Text>
      </View>
    </View>
  );
}
























