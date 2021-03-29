import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

function SelectModal({
  alertText,
  refuseText,
  allowText,
  onHandlePressAllow,
  onHandlePressRefuse,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>{alertText}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.button, styles.allowButton]}>
          <Text style={styles.allowText} onPress={() => onHandlePressAllow()}>
            {allowText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.button, styles.refuseButton]}>
          <Text style={styles.refuseText} onPress={() => onHandlePressRefuse()}>
            {refuseText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height; // 752

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    width: windowWidth * 0.375,
    height: windowHeight * 0.4122,
    elevation: 7,
  },
  alertContainer: {},
  buttonContainer: {
    width: '100%',
    height: windowHeight * 0.0745,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: windowHeight * 0.07,
    paddingHorizontal: windowWidth * 0.039,
  },
  button: {
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    paddingVertical: 12,
    height: windowHeight * 0.0745,
    width: windowWidth * 0.133,
    elevation: 7,
  },
  allowButton: {
    backgroundColor: '#707070',
  },
  refuseButton: {
    backgroundColor: '#FB537B',
  },
  alertText: {
    fontSize: windowWidth * 0.01875,
    color: '#707070',
    fontFamily: 'NotoSansKR-Bold',
  },
  allowText: {
    fontSize: windowWidth * 0.01875,
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
  },
  refuseText: {
    fontSize: windowWidth * 0.01875,
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
  },
});

export default SelectModal;
