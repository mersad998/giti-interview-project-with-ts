import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {purple, white} from 'utils/constants/colors';
import {Text, Button, Spinner, Input, Icon, Item} from 'native-base';

interface NamePickerInterface {
  text: string;
  visible: boolean;
  confirm(txt: any): string | Number;
  dissmiss(): void;
}

export const NamePicker = ({
  text,
  visible,
  confirm,
  dissmiss,
}: NamePickerInterface) => {
  const [name, setName] = useState();

  return (
    <Modal
      animationOut="fadeOutDown"
      animationIn="fadeInDown"
      animationInTiming={750}
      isVisible={visible}
      swipeDirection={['right', 'left', 'up', 'down']}
      onSwipeComplete={dissmiss}
      onBackButtonPress={dissmiss}>
      <View style={styles.view}>
        <Text style={styles.text}>{text}</Text>

        <Item rounded style={styles.inputItem}>
          <Input
            placeholder="نام آلبوم جدید"
            placeholderTextColor={'gray'}
            style={styles.input}
            onChangeText={(txt: any) => setName(txt)}
            value={name}
          />
          <Icon
            name="account"
            type="MaterialCommunityIcons"
            style={styles.inputIcon}
          />
        </Item>
        <View style={styles.rowView}>
          <Button
            primary
            transparent
            style={styles.button}
            onPress={() => {
              if (name) {
                confirm(name);
              }
            }}>
            <Text style={styles.btnConfirm}>تایید</Text>
          </Button>
          <Button danger transparent style={styles.button} onPress={dissmiss}>
            <Text style={styles.btnDissmiss}>انصراف</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: purple,
    borderRadius: 10,
    alignItems: 'center',
    padding: 8,
  },
  text: {
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'IRANSansMobile(FaNum)',
    fontSize: 14,
    color: 'white',
    alignSelf: 'flex-end',
    marginRight: '7%',
  },
  button: {alignSelf: 'center'},
  btnConfirm: {color: 'white', fontFamily: 'IRANSansMobile(FaNum)'},
  btnDissmiss: {color: 'tomato', fontFamily: 'IRANSansMobile(FaNum)'},
  Spinner: {alignSelf: 'center'},
  rowView: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  inputItem: {
    backgroundColor: white,
    borderColor: '#bf8f47',
    marginBottom: 8,
    height: 45,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    textAlign: 'right',
    color: purple,
    paddingLeft: 32,
    fontFamily: 'IRANSansMobile(FaNum)',
    fontSize: 14,
  },
  inputIcon: {
    color: purple,
    fontSize: 20,
    marginLeft: 5,
  },
});
