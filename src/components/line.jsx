import { View, StyleSheet } from "react-native";


export default function Line() {
  return <View style={styles.tabBarIconContainer}></View>
}

const styles = StyleSheet.create({
  tabBarIconContainer: {
    position: 'absolute',
    bottom: 56,
    width: "100%",
    height: 2,
    backgroundColor: '#003768'
  },
});


// #003768