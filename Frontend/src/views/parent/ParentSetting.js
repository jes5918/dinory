import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

function ParentSetting() {
  return (
    <View style={styles.container}>
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightcoral',
  },
});

export default ParentSetting;
