import {AUTH} from '../constants';
export interface RequestUserLogin {
  payload: {
    password: string | Number;
    username: string | Number;
    remember: boolean;
  };
  dispatch: Function;
}
const requestUserLogin = ({payload, dispatch}: RequestUserLogin) => {
  console.log('in actions :');
  console.log(payload, dispatch);
  dispatch({type: AUTH.LOGIN_REQUEST, payload});
};

const setUser = ({payload, dispatch}) => {
  console.log('in set user action :');
  console.log(payload, dispatch);
  dispatch({type: AUTH.SET_USER, payload});
};
const setLoginErr = (err) => ({
  type: AUTH.LOGIN_FAILURE,
  err,
});
interface UserLogout {
  dispatch: Function;
  payload?: any;
}
const userLogout = ({payload, dispatch}: UserLogout) => {
  console.log('in userLogout action :');
  console.log(payload, dispatch);
  dispatch({type: AUTH.LOGOUT, payload});
};
const requestUserSignup = ({payload, dispatch}) => {
  console.log('in requestUserSignup actions :');
  console.log(payload, dispatch);
  dispatch({type: AUTH.SIGNUP_REQUEST, payload});
};
const resetMessages = ({payload, dispatch}) => {
  dispatch({type: AUTH.RESET_MESSAGES, payload});
};

export {
  requestUserLogin,
  requestUserSignup,
  setUser,
  setLoginErr,
  userLogout,
  resetMessages,
};
