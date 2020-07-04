import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import Modal from 'react-native-modal';
import {
  white,
  BootstrapDanger,
  BootstrapSuccess,
  BootstrapPrimary,
} from 'utils/constants/colors';
import { Button, Icon } from 'native-base';
import { CoustomTextComponent } from 'utils/constants/elements';

export const Error = ({ text, visible, confirm }) => (
  <Modal
    animationOut="fadeOutDown"
    animationIn="jello"
    animationInTiming={750}
    isVisible={visible}
    swipeDirection={['right', 'left', 'up', 'down']}
    onSwipeComplete={confirm}
    onBackButtonPress={confirm}>
    <View style={styles.view}>
      <Icon
        name="close-circle"
        type="MaterialCommunityIcons"
        style={styles.iconError}
      />
      <CoustomTextComponent style={styles.text}>{text}</CoustomTextComponent>
      <Button primary transparent style={styles.button} onPress={confirm}>
        <CoustomTextComponent style={styles.confirmText}>تایید</CoustomTextComponent>
      </Button>
    </View>
  </Modal>
);

export const Success = ({ text, visible, confirm }) => (
  <Modal
    animationOut="fadeOutDown"
    animationIn="pulse"
    animationInTiming={500}
    isVisible={visible}
    swipeDirection={['right', 'left', 'up', 'down']}
    onSwipeComplete={confirm}
    onBackButtonPress={confirm}>
    <View style={styles.view}>
      <Icon
        name="check-decagram"
        type="MaterialCommunityIcons"
        style={styles.iconSuccess}
      />
      <CoustomTextComponent style={styles.text}>{text}</CoustomTextComponent>
      <Button primary transparent style={styles.button} onPress={confirm}>
        <CoustomTextComponent style={styles.confirmText}>تایید</CoustomTextComponent>
      </Button>
    </View>
  </Modal>
);


export const Delete = ({
  text,
  visible,
  txtConfirm,
  txtDismiss,
  confirm,
  dismiss,
}) => (
    <Modal
      animationOut="fadeOutDown"
      animationIn="fadeInDown"
      isVisible={visible}
      swipeDirection={['right', 'left', 'up', 'down']}
      onSwipeComplete={dismiss}
      onBackButtonPress={dismiss}>
      <View style={styles.view}>
        <Icon
          name="close-circle"
          type="MaterialCommunityIcons"
          style={styles.iconError}
        />
        <CoustomTextComponent style={styles.text}>{text}</CoustomTextComponent>
        <View style={styles.viewConfirm}>
          <Button danger transparent onPress={dismiss} style={styles.btnConfirm}>
            <CoustomTextComponent style={styles.cancellText}>{txtDismiss || 'انصراف'}</CoustomTextComponent>
          </Button>
          <Button primary transparent onPress={confirm} style={styles.btnConfirm}>
            <CoustomTextComponent style={styles.confirmText}>{txtConfirm || 'بله'}</CoustomTextComponent>
          </Button>
        </View>
      </View>
    </Modal>
  );

const styles = StyleSheet.create({
  view: {
    backgroundColor: white,
    borderRadius: 10,
    alignItems: 'center',
    padding: 8,
  },
  iconError: { color: BootstrapDanger, fontSize: 60 },
  iconSuccess: { color: BootstrapSuccess, fontSize: 60 },
  text: {
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'IRANSansMobile(FaNum)',
    fontSize: 14,
  },
  button: { alignSelf: 'center', },
  btnConfirm: { flex: 1, justifyContent: 'center' },
  viewConfirm: { flexDirection: 'row' },
  url: { color: BootstrapPrimary, fontFamily: 'IRANSansMobile(FaNum)' },
  Spinner: { alignSelf: 'center' },
  confirmText: { color: BootstrapPrimary },
  cancellText: { color: BootstrapDanger }

});
