import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { purple } from 'utils/constants/colors';
import { Text, Button, Spinner } from 'native-base';
import { IconInput } from 'utils/constants/elements';

export const NamePicker = ({ text, visible, confirm, dissmiss }) => {
    const [name, setName] = useState()

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
                <IconInput value={name} onChangeText={setName} />
                <View style={styles.rowView}>
                    <Button primary transparent style={styles.button} onPress={() => { if (name) { confirm(name) } }}>
                        <Text style={styles.btnConfirm}>تایید</Text>
                    </Button>
                    <Button danger transparent style={styles.button} onPress={dissmiss}>
                        <Text style={styles.btnDissmiss}>انصراف</Text>
                    </Button>
                </View>

            </View>
        </Modal>
    );


}

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
        marginRight: '7%'
    },
    button: { alignSelf: 'center' },
    btnConfirm: { color: 'white', fontFamily: 'IRANSansMobile(FaNum)' },
    btnDissmiss: { color: 'tomato', fontFamily: 'IRANSansMobile(FaNum)' },
    Spinner: { alignSelf: 'center' },
    rowView: {
        flexDirection: 'row',
        alignSelf: 'flex-start'

    }
});
