import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {
  CoustomTextComponent,
  CoustomButtonComponent,
} from '../../../utils/constants/elements';
import {Error} from 'utils/modals/alerts';
import {white, purple, lightGray} from 'utils/constants/colors';
import {
  Container,
  Input,
  Icon,
  Item,
  CheckBox,
  ListItem,
  Body,
  View,
  Content,
} from 'native-base';
import {useForm} from 'react-hook-form';
import {
  requestUserLogin,
  resetMessages,
} from '../../../../__redux/actions/authActions';
import {RootReducer} from '../../../../__redux/reducers';
import {User} from '../../../../__redux/reducers/Types';

interface LoginPageInterface {
  navigation: any;
  user: User;
  requestUserLogin: Function;
  errorMessage: string;
  resetMessages: Function;
  isLoading: boolean;
}

const LoginPage = (props: LoginPageInterface) => {
  const {register, setValue, handleSubmit} = useForm<OnSubmit>();
  const [errMessage, setErrMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const passwordRef = useRef<any>(null);

  const changeShowPass = () => setShowPass(!showPass);

  useEffect(() => {
    console.log('use effect login');

    register({name: 'username'});
    register({name: 'password'});
  }, [register]);

  useEffect(() => {
    if (props.user && props.user.token) {
      console.log(props.user.token);

      props.navigation.replace('Home');
    }
  }, [props.user]);

  const onRememberMeClick = () => {
    setRememberMe(!rememberMe);
  };
  const resetError = () => {
    setErrMessage('');
  };
  const onLoginClick = () => {
    props.navigation.replace('Home');
  };
  const onSignUpClick = () => {
    props.navigation.navigate('SignUp');
  };
  interface OnSubmit {
    username: string | Number | undefined;
    password: string | Number | undefined;
    remember?: boolean;
  }
  const onSubmit = (data: OnSubmit) => {
    console.log(' in on submitt');

    console.log(data);

    if (!data.username) {
      setErrMessage('لطفا نام کاربری را وارد نمایید');
    } else if (!data.password) {
      setErrMessage('لطفا کلمه عبور را وارد نمایید');
    } else {
      data.remember = rememberMe;
      props.requestUserLogin(data);
    }
  };

  return (
    <Container style={{backgroundColor: lightGray}}>
      <Content>
        <Error
          visible={errMessage != ''}
          text={errMessage}
          confirm={resetError}
        />
        <Error
          visible={props.errorMessage != ''}
          text={props.errorMessage}
          confirm={() => props.resetMessages()}
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
            onChangeText={(text) => setValue('username', text, false)}
            editable={!props.isLoading}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => passwordRef.current._root.focus()}
          />
          <Icon
            name="account"
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
            onChangeText={(text) => setValue('password', text, false)}
            secureTextEntry={showPass ? false : true}
            editable={!props.isLoading}
            ref={passwordRef}
          />
          <Icon
            name="key"
            type="MaterialCommunityIcons"
            style={styles.inputIcon}
          />
        </Item>
        <ListItem style={styles.rememberContainer}>
          <Body>
            <CoustomTextComponent style={styles.rememeber}>
              مرا به خاطر بسپار
            </CoustomTextComponent>
          </Body>
          <CheckBox
            color={purple}
            onPress={onRememberMeClick}
            checked={rememberMe}
          />
        </ListItem>
        <View style={styles.ViewBottom}>
          <CoustomButtonComponent
            name="ورود"
            disabled={props.isLoading}
            isLoading={props.isLoading}
            onPress={handleSubmit(onSubmit)}
          />

          <CoustomTextComponent onPress={onSignUpClick} style={styles.signUp}>
            ثبت نام
          </CoustomTextComponent>
        </View>
      </Content>
      <Image
        resizeMode={'stretch'}
        source={require('assets/footer.png')}
        style={styles.footerImage}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
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
  signUp: {
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
});

const mapStateToProps = (state: RootReducer) => ({
  user: state.loginReducer.user,
  errorMessage: state.loginReducer.errorMessage,
  isLoading: state.loginReducer.isLoading,
});
interface RequestUserLogin {
  password: string | Number;
  username: string | Number;
  remember: boolean;
}
const mapDispatchToProps = (dispatch: Function) => ({
  requestUserLogin: (payload: RequestUserLogin) =>
    requestUserLogin({payload, dispatch}),
  resetMessages: (payload: any) => resetMessages({payload, dispatch}),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
