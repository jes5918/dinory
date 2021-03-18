import React from 'react'
import { ImageBackground, View, Text, StyleSheet, Button } from 'react-native'

export default function ImageCaption() {
  // const image = {require("../../assets/images/background3")}
  // const image = { uri: "https://reactjs.org/logo-og.png" };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: 'center',
    },
    image: {
      flex: 1,
      justifyContent: "center",
      width: '100%',
      height: '100%'
    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
    },
    btn : {
      width:40,
      fontSize: 32,
    }
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/images/background3.png")} style={styles.image} resizeMode="cover">
        <Text style={styles.text}>어떤 단어들이 나왔는지 확인해볼까요?</Text>
        <Button title="단어장에 추가하기" color="#f194ff" style={styles.btn} />
      </ImageBackground>
    </View>
  )
}
