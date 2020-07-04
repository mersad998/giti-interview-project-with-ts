import {AUTH} from '../constants';
import {saveUser} from '../../src/utils/database/userData';
import {LoginRedcer, Action, User} from './Types';

const SaveUserInfo = async (user: User) => {
  try {
    await saveUser(user).then(void console.log('save user ok'));
  } catch (error) {
    console.log('save user failed');
  }
};

const loginReducer = (
  state: LoginRedcer = {
    token: '',
    successMessage: '',
    errorMessage: '',
    isLoading: false,
    user: {},
  },
  action: any,
) => {
  switch (action.type) {
    case AUTH.START_ISLOADING:
      return {...state, isLoading: true};
      break;
    case AUTH.STOP_ISLOADING:
      return {...state, isLoading: false};
      break;
    case AUTH.LOGIN_SUCCESS:
      console.log('in reducer :');

      console.log(action);
      const loginModel = {
        username: action.payload.data.username,
        password: action.payload.data.password,
        remember: action.payload.data.remember,
        token: action.payload.token,
      };
      SaveUserInfo(loginModel);
      return {...state, user: loginModel};

      break;
    case AUTH.LOGIN_FAILURE:
      console.log('login failed');
      return {...state, errorMessage: 'نام کاربری یا کلمه عبور اشتباه است'};
      break;
    case AUTH.SET_USER:
      console.log('setuser reducer');
      console.log(action);

      const model: User = {
        username: action.payload.username,
        password: action.payload.password,
        remember: action.payload.remember,
        token: action.payload.token,
      };
      console.log(model);
      return {...state, user: model};
      return state;
      break;
    case AUTH.LOGOUT:
      return {...state, user: {}};
      break;
    case AUTH.RESET_MESSAGES:
      return {...state, errorMessage: '', successMessage: ''};
      break;
    case AUTH.SIGNUP_SUCCESS:
      return {...state, successMessage: 'ثبت نام با موفقیت انجام شد.'};
      break;
    case AUTH.SIGNUP_FAILURE:
      return {
        ...state,
        errorMessage: 'عملیات انجام نشد . لطفا مجددا تلاش نمایید',
      };
      break;
    default:
      return state;
      break;
  }
};

export default loginReducer;
