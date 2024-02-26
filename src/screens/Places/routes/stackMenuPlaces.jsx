import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlaceListScreen from '../PlaceListScreen/PlaceListScreen'

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="todos"
        component={() => <PlaceListScreen />}
      />
    </Stack.Navigator>
  )
}