import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {
  white,
  Blue400,
  Blue800,
  Blue500,
  Blue900,
} from 'utils/constants/colors';
import {Text, Button, Icon, Input, Spinner, Item} from 'native-base';
export default function TokenModal({
  visible,
  confirm,
  dismiss,
  isLoading,
  typedToken,
  setTypedToken,
}) {
  const returnToken = () => {
    confirm(typedToken);
  };
  const handleInput = e => {
    setTypedToken(e);
  };

  return (
    <Modal
      animationOut="fadeOutDown"
      animationIn="fadeInDown"
      isVisible={visible}
      swipeDirection={['right', 'left', 'up', 'down']}
      onSwipeComplete={dismiss}
      onBackButtonPress={dismiss}>
      <View style={styles.view}>
        <Icon
          name="check-circle"
          type="FontAwesome"
          style={styles.iconPrimary}
        />
        <Text style={styles.text}>
          کد اعتبارسنجی 5 رقمی به شماره تلفن همراه شما ارسال شد، لطفا آن را در
          کادر پایین وارد کنید
        </Text>
        <Item rounded style={styles.inputItem}>
          <Input
            placeholder="-  -  -  -  -"
            placeholderTextColor={Blue500}
            style={styles.input}
            keyboardType="numeric"
            value={typedToken}
            onChangeText={handleInput}
            editable={!isLoading}
            maxLength={5}
          />
        </Item>
        {isLoading && <Spinner color={Blue400} />}
        {!isLoading && (
          <View style={styles.viewConfirm}>
            <Button
              danger
              transparent
              onPress={dismiss}
              style={styles.btnConfirm}>
              <Text>انصراف</Text>
            </Button>
            <Button
              primary
              transparent
              onPress={returnToken}
              style={styles.btnConfirm}>
              <Text>تایید</Text>
            </Button>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: white,
    borderRadius: 10,
    alignItems: 'center',
    padding: 8,
  },
  iconPrimary: {color: Blue400, fontSize: 60},
  text: {textAlign: 'center'},
  btnConfirm: {flex: 1, justifyContent: 'center'},
  viewConfirm: {flexDirection: 'row'},
  tokenView: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    color: Blue800,
    fontFamily: 'IRANSansMobile(FaNum)',
    textAlign: 'center',
  },
  inputItem: {
    borderColor: Blue900,
    borderWidth: 1,
    height: 35,
    width: '100%',
    marginBottom: 10,
    marginTop: 30,
  },
});
