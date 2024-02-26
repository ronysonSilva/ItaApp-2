import { Text, View, Image } from "react-native";
import Lugares from "../../assets/icons/icon-images.png";
import Prefeitura from "../../assets/icons/icon-prefeitura.png";

export default function HeaderPage({ NomePage, IconName }) {
  let iconSource;

  // Lógica para selecionar a fonte do ícone com base no IconName
  switch (IconName) {
    case "lugares":
      iconSource = Lugares;
      break;
    case "prefeitura":
      iconSource = Prefeitura;
      break;

    default:
      iconSource = Lugares; // Ícone padrão
  }

  return (
    <View className=" pb-1 flex-row justify-start items-center gap-1 absolute top-[72] ml-5 left-0 z-[2002] border-b-2 border-sky-500 rounded-br-2xl rounded blur-sm -pl-1">
      <Image
        source={iconSource}
        className="w-7 h-7"
        resizeMode="contain"
      />
      <Text className="text-white font-semibold text-xl mr-1">{NomePage}</Text>
    </View>
  );
}
