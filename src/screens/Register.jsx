import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function Register() {
  // Navegar para o Register
  const navigation = useNavigation();

  function handlePressRegister() {
    navigation.navigate("drawer");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registra-se</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#B1C0D7"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#B1C0D7"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#B1C0D7"
      />
      <TextInput
        style={styles.input}
        placeholder="Repita sua senha"
        placeholderTextColor="#B1C0D7"
      />
      <TouchableOpacity style={styles.buttonEntrar}>
        <Text
          onPress={() => handlePressRegister()}
          style={styles.buttonEntrarText}
        >
          Registrar e entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A3966",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 26,
  },
  input: {
    height: 46,
    width: "90%",
    marginBottom: 10,
    paddingHorizontal: 14,
    backgroundColor: "#00284D",
    fontSize: 18,
    color: "#fff",
    borderRadius: 6,
  },
  buttonEntrar: {
    width: "90%",
    marginTop: 16,
    backgroundColor: "#31A7E5",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonEntrarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
