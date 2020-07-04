import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Image } from 'react-native';
import { lightGray, purple, white } from 'utils/constants/colors';
import { CoustomTextComponent } from 'utils/constants/elements';
import { MyHeader, CoustomButtonComponent } from 'utils/constants/elements';
import { Input, Icon, Item, Content } from 'native-base';
import { useForm } from "react-hook-form";
import { emailRegex } from 'utils/constants/regex'
import { Error, Success } from 'utils/modals/alerts';
import { requestUserSignup, resetMessages } from '../../../../__redux/actions/authActions';
import { connect } from 'react-redux';

const SignUp = props => {
  const { register, setValue, handleSubmit } = useForm();

  const [errMessage, setErrMessage] = useState('');
  const [showPass, setShowPass] = useState(false);

  const EmailRef = useRef(null);
  const PasswordRef = useRef(null);
  const RePasswordRef = useRef(null);

  useEffect(() => {
    console.log('use effect SignUp');
    register({ name: "username" });
    register({ name: "email" });
    register({ name: "password" });
    register({ name: "passwordRepeat" });
  }, [register]);

  const onSubmit = data => {

    if (!data.username) {
      setErrMessage('لطفا نام کاربری خود ر انتخاب نمایید')
      return
    } else if (!data.email) {
      setErrMessage('لطفا پست الکترونیکی خود را وارد نمایید')
      return
    } else if (!emailRegex.test(data.email)) {
      setErrMessage('پست الکترونیکی وارد شده صحیح نمیباشد')
      return
    } else if (!data.password) {
      setErrMessage('لطفا کلمه عبور خود را انتخاب نمایید')
      return
    } else if (!data.passwordRepeat) {
      setErrMessage('لطفا تکرار کلمه عبور را وارد نمایید')
      return
    } else if (data.password !== data.passwordRepeat) {
      setErrMessage('کلمه عبور با تکرار کلمه عبور یکسان نمیباشد')
      return
    } else {
      console.log('send to server');
      props.requestUserSignup(data)
    }
  }

  const resetError = () => {
    setErrMessage('');
  };
  const onBackPress = () => {
    props.navigation.goBack();
  };
  const changeShowPass = () => setShowPass(!showPass);
  const onSignUpCompelete = () => {
    props.resetMessages();
    onBackPress()
  }

  return (
    <>
      <MyHeader Title="ثبت نام" onBackPress={onBackPress} />
      <StatusBar backgroundColor="#470425" />
      <Content style={styles.Container}>
        <Error
          visible={errMessage != ''}
          text={errMessage}
          confirm={resetError}
        />
        <Error
          visible={props.errorMessage != ''}
          text={props.errorMessage}
          confirm={props.resetMessages}
        />
        <Success
          visible={props.successMessage != ''}
          text={props.successMessage}
          confirm={onSignUpCompelete}
        />
        <Image
          source={require('assets/logo.png')}
          resizeMode={'stretch'}
          style={styles.image}
        />
        <CoustomTextComponent style={styles.TextDescription}>
          کلیه حقوق این سایت برای شرکت گیتی سامانه نوین شرق محفوظ است
        </CoustomTextComponent>
        <Item rounded style={styles.inputItem}>
          <Input
            placeholder="نام کاربری"
            placeholderTextColor={'gray'}
            style={styles.input}

            onChangeText={text => setValue('username', text, false)}
            editable={!props.isLoading}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => EmailRef.current._root.focus()}
          />
          <Icon
            name="account"
            type="MaterialCommunityIcons"
            style={styles.inputIcon}
          />
        </Item>
        <Item rounded style={styles.inputItem}>
          <Input
            placeholder="پست الکترونیکی"
            placeholderTextColor={'gray'}
            style={styles.input}
            onChangeText={text => setValue('email', text, false)}
            editable={!props.isLoading}
            ref={EmailRef}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => PasswordRef.current._root.focus()}
          />
          <Icon
            name="email"
            type="MaterialCommunityIcons"
            style={styles.inputIcon}
          />
        </Item>
        <Item rounded style={styles.inputItem}>
          <Icon
            name="eye"
            type="MaterialCommunityIcons"
            style={styles.inputIcon}
            onPress={changeShowPass}
          />
          <Input
            placeholder="کلمه عبور"
            placeholderTextColor={'gray'}
            style={styles.input}
            onChangeText={text => setValue('password', text, false)}
            secureTextEntry={showPass ? false : true}
            editable={!props.isLoading}
            ref={PasswordRef}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => RePasswordRef.current._root.focus()}
          />
          <Icon
            name="key"
            type="MaterialCommunityIcons"
            style={styles.inputIcon}
          />
        </Item>
        <Item rounded style={styles.inputItem}>
          <Icon
            name="eye"
            type="MaterialCommunityIcons"
            style={styles.inputIcon}
            onPress={changeShowPass}
          />
          <Input
            placeholder="تکرار کلمه عبور"
            placeholderTextColor={'gray'}
            style={styles.input}
            onChangeText={text => setValue('passwordRepeat', text, false)}
            secureTextEntry={showPass ? false : true}
            editable={!props.isLoading}
            ref={RePasswordRef}
            returnKeyType="done"
          />
          <Icon
            name="key"
            type="MaterialCommunityIcons"
            style={styles.inputIcon}
          />
        </Item>
        <CoustomButtonComponent
          name="ثبت نام"
          disabled={props.isLoading}
          isLoading={props.isLoading}
          onPress={handleSubmit(onSubmit)}
          style={styles.Button}
        />
      </Content>
      <Image
        resizeMode={'stretch'}
        source={require('assets/footer.png')}
        style={styles.footerImage}
      />
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: lightGray,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
  },
  ViewBottom: {
    marginTop: 20,
    paddingTop: 20,
    width: '100%',
    height: undefined,
    alignSelf: 'center',
    alignItems: 'center',
  },
  forget: {
    color: 'black',
    textAlign: 'center',
    marginTop: 30,
    paddingBottom: 5,
    paddingVertical: 8,
    fontFamily: 'IRANSansMobile(FaNum)',
    width: '80%',
    alignSelf: 'center',
    fontSize: 12,
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
  btn: {
    backgroundColor: purple,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
    height: undefined,
    marginTop: 25,
  },
  btnText: {
    color: white,
    fontFamily: 'IRANSansMobile(FaNum)',
  },
  rememeber: {
    color: 'black',
    fontFamily: 'IRANSansMobile(FaNum)',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  rememberContainer: {
    height: undefined,
    marginVertical: 4,
    justifyContent: 'center',
  },
  TextDescription: {
    color: 'black',
    fontSize: 10,
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
  },
  footerImage: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
  },
  Button: {
    marginTop: 30,
  },
});

const mapStateToProps = state => ({
  errorMessage: state.loginReducer.errorMessage,
  successMessage: state.loginReducer.successMessage,
  isLoading: state.loginReducer.isLoading
});
const mapDispatchToProps = dispatch => ({
  requestUserSignup: data => requestUserSignup({ data, dispatch }),
  resetMessages: data => resetMessages({ data, dispatch }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
