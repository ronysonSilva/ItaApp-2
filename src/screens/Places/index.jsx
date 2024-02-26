import { ScrollView } from "react-native";
import HeaderProfile from "../../components/headerProfile";
import HeaderPage from "../../components/headerPage";
import PlacesFeed from "./Feed/feedPlaces"
import CarrosselPlaces from "./Carrossel/CarrosselPlaces";
import PlacesMenu from "./Feed/PlacesMenu/placesMenu";

export default function Feed() {

  return (
    <ScrollView className="bg-slate-200 flex-1">
      <HeaderProfile />
      <HeaderPage NomePage="Lugares" iconName="images" />
      <CarrosselPlaces />
      <PlacesMenu />
    </ScrollView>
  );
}