import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Swiper from "react-native-swiper"

export default function CarrosselPlaces() {
  return (
    <View intensity={50} className="min-h-[80px] w-full">
      <LinearGradient
        className="min-h-[380px] w-full rounded-br-[50px] rounded-bl-[50px] bg-red-500"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        blurType="light"
        blurAmount={10}
        // start={{ x: 0, y: 2 }}
        // end={{ x: 1.5, y: 2 }}
        colors={["#003768", "#003768"]}
      /><>
        <View className="absolute mt-[126px] z-[2000]  h-[200px] mx-5 left-0 right-0 transform -translate-x-1/2 -translate-y-1/2">
          <Swiper
            autoplay={false}
            loop={true}
            paginationStyle={{ bottom: 3 }}
            dotColor="#c2c2c2"
            activeDotColor="#31A7E5"
          >
            <View>
              <Image
                className="rounded-lg"
                source={require("../../../../assets/hospital-sx.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View>
              <Image
                className="rounded-lg"
                source={require("../../../../assets/praca-texeira.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View>
              <Image
                className="rounded-lg"
                source={require("../../../../assets/famacia-central.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </Swiper>
        </View>
      </>
    </View>

  )
}