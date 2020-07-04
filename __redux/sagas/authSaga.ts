import {put, call, takeEvery, takeLatest, select} from 'redux-saga/effects';
import {AUTH} from '../constants';
import {LoginApi, SignupApi} from '../api';

export function* handleLoginRequest(data: any) {
  try {
    yield put({type: AUTH.START_ISLOADING});
    console.log('in handleLoginRequest saga :');
    console.log(data);
    const token = yield call(LoginApi, data);
    console.log('saga ok');
    console.log(token);
    data.token = token;
    yield put({type: AUTH.STOP_ISLOADING});
    yield put({type: AUTH.LOGIN_SUCCESS, data});
  } catch (error) {
    yield put({type: AUTH.LOGIN_FAILURE, error});
    yield put({type: AUTH.STOP_ISLOADING});
    console.log('saga fail');
    console.log(error);
  }
}

export function* handleSignupRequest(data: any) {
  try {
    console.log('in handleSignupRequest saga :');
    console.log(data);
    yield put({type: AUTH.START_ISLOADING});
    const result = yield call(SignupApi, data);
    console.log('saga ok');
    console.log('saga result : ');
    console.log(result);
    yield put({type: AUTH.STOP_ISLOADING});
    yield put({type: AUTH.SIGNUP_SUCCESS, result});
  } catch (error) {
    yield put({type: AUTH.SIGNUP_FAILURE, error});
    yield put({type: AUTH.STOP_ISLOADING});
    console.log('saga fail');
    console.log(error);
  }
}
export const signup = takeEvery(AUTH.SIGNUP_REQUEST, handleSignupRequest);
export const login = takeEvery(AUTH.LOGIN_REQUEST, handleLoginRequest);
