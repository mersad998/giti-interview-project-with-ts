import {all} from 'redux-saga/effects';

import albumsSaga from './albumsSaga';
import photosSaga from './photosSaga';
import {login, signup} from './authSaga';

export default function* rootSaga() {
  try {
    yield all([albumsSaga(), photosSaga(), login, signup]);
  } catch (e) {
    console.error(e);
  }
}
