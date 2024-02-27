import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import TabRoutes from "./tab.routes";
import { Dimensions } from 'react-native'; // Importe o Dimensions

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerStyle: { width: Dimensions.get('window').width }, // Define a largura para 100%
      }}
    >
      <Drawer.Screen
        name="home"
        component={TabRoutes}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          drawerLabel: "Início",
        }}
      />
    </Drawer.Navigator>
  );
}