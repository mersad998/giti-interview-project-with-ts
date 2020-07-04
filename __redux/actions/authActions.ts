import {AUTH} from '../constants';

const requestUserLogin = ({payload, dispatch}) => {
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
const userLogout = ({payload, dispatch}) => {
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
