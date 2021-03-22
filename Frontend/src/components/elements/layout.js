import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const backgroundimage = require('../../assets/images/background1.png'); // 배경사진 설정!

const Layout = () => (
  <View style={styles.container}>
    <ImageBackground source={backgroundimage} style={styles.backgroundimage}>
      <View style={styles.layout}>
        {/* 개발 시작 부분 */}
        {/* <Text>잘나옵니까?</Text>   */}
        </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  backgroundimage: {
    flex: 1,
    resizeMode: "cover", 
    // resizeMode ==이미지를 꽉 채워줌
    justifyContent: "center",
    alignItems:'center'
  },
  layout: {
    // Customizing 부분
    width:1000,
    height:500,
    opacity:0.7,
    padding:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#f8f8ff",
    borderRadius:50
  }
});

export default Layout;