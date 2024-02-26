import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  buttonOpenDrawer: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    zIndex: 999,
  },
  photoAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#2887DF',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 25,
    height: 25,
    backgroundColor: '#fff',
    borderRadius: 100
  }
});
