import React from 'react';
import {View, Text, Modal, StyleSheet, Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/AntDesign';

//onHandleCloseModal 은 디바이스에서 뒤로가기 했을 때 (기기 내부에서) 모달이 꺼지는 함수 처리 state 토글하는 것으로 처리하면 됨
//setTimeFunction 이 모달이 켜지고 몇 초동안 보여지는지 하단에 예시 있으니깐 가져다 쓰면 됨
// iconName은 AntDesign에서 찾아서 쓰세용 다른 곳에서 쓰면 안불러와집니다.
// ModalVisible은 모달이 켜져있는지 꺼져있는지 상태값
export default function AlertModal({
  modalVisible,
  onHandleCloseModal,
  text,
  iconName,
  setTimeFunction,
  color,
}) {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onShow={() =>
        setTimeFunction
          ? setTimeFunction()
          : alert('함수를 props로 내려주세요!')
      }
      onRequestClose={() => {
        onHandleCloseModal
          ? onHandleCloseModal()
          : alert('함수를 props로 내려주세요!');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <MaterialIcons
            animationType="fade"
            style={[styles.modalIcon, {color: color}]}
            name={iconName}
          />
          <Text style={styles.modalText}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
}
const dimension = Dimensions.get('window');
const width = dimension.width;
const height = dimension.height;

const styles = StyleSheet.create({
  modalIcon: {
    color: 'red',
    fontSize: width * 0.1,
    marginVertical: width * 0.015,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: width * 0.5,
    height: height * 0.6,
    display: 'flex',
    justifyContent: 'space-around',
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: width * 0.018,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: width * 0.03,
    color: '#707070',
  },
});

/////////// 상단에서 닫히는 함수 쓸 때 이거로 props 써서 하시면 됩니당. 예시에여 예시 알아서 바꿔서 쓰세요잉
// const closeModal = () => {
//   setTimeout(() => {
//     setModalVisible(!modalVisible);
//   }, 2000);
// };
//////////////////
//////////////////이거는 모달 켜있는 상태 관리하는 것.
// const [modalVisible, setModalVisible] = useState(true);
/////////////////////////
// const changeModalState = () => {
//   setModalVisible(!modalVisible);
// };
