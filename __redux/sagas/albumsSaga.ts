import {put, call, takeEvery, takeLatest, select} from 'redux-saga/effects';
import {RootReducer} from '../reducers';
import {setAlbums, setAlbumsLoadError} from '../actions';
import {ALBUMS} from '../constants';
import {
  getAllAlbums,
  addNewAlbumApi,
  deleteAnAlbumApi,
  editAnAlbumApi,
} from '../api/index';

export const getToken = (state: RootReducer) => state.loginReducer.user.token;

export function* handleAlbumsLoad() {
  try {
    console.log('handleAlbumsLoad in saga called');
    yield put({type: ALBUMS.START_ISLOADING});
    console.log('is loading started');

    const JWTtoken = yield select(getToken);
    console.log('jwt got');

    console.log(JWTtoken);
    const images = yield call(getAllAlbums, JWTtoken);
    console.log('images in saga :' + images);
    console.log(images);
    yield put({type: ALBUMS.STOP_ISLOADING});
    yield put({type: ALBUMS.LOAD_SUCCESS, images});
  } catch (error) {
    yield put({type: ALBUMS.STOP_ISLOADING});
    // should handle errors
  }
}
export function* handleAddNewAlbum(data: any) {
  try {
    yield put({type: ALBUMS.START_ISLOADING});
    console.log('handleAddNewAlbum in saga called');
    const JWTtoken = yield select(getToken);
    data.token = JWTtoken;
    const result = yield call(addNewAlbumApi, data);
    yield put({type: ALBUMS.STOP_ISLOADING});
    yield put({type: ALBUMS.ADD_NEW_ALBUM_SUCCESS});
  } catch (error) {
    yield put({type: ALBUMS.STOP_ISLOADING});
    yield put({type: ALBUMS.ADD_NEW_ALBUM_FAILED, error});
  }
}
export function* handleDeleteAlbum(data: any) {
  try {
    yield put({type: ALBUMS.START_ISLOADING});
    console.log('handleDeleteAlbum in saga called');
    const JWTtoken = yield select(getToken);
    data.token = JWTtoken;
    const result = yield call(deleteAnAlbumApi, data);
    yield put({type: ALBUMS.STOP_ISLOADING});
    yield put({type: ALBUMS.DELETE_ALBUM_SUCCESS});
  } catch (error) {
    yield put({type: ALBUMS.STOP_ISLOADING});
    yield put({type: ALBUMS.DELETE_ALBUM_FAILED, error});
  }
}
export function* handleEditAlbum(data: any) {
  try {
    yield put({type: ALBUMS.START_ISLOADING});
    console.log('handleEditAlbum in saga called');
    const JWTtoken = yield select(getToken);
    data.token = JWTtoken;
    const result = yield call(editAnAlbumApi, data);
    yield put({type: ALBUMS.STOP_ISLOADING});
    yield put({type: ALBUMS.EDIT_ALBUM_SUCCESS});
  } catch (error) {
    yield put({type: ALBUMS.STOP_ISLOADING});
    yield put({type: ALBUMS.EDIT_ALBUM_FAILED, error});
  }
}
export default function* watchImagesLoad() {
  yield takeEvery(ALBUMS.LOAD, handleAlbumsLoad);
  yield takeEvery(ALBUMS.ADD_NEW_ALBUM, handleAddNewAlbum);
  yield takeEvery(ALBUMS.DELETE_ALBUM, handleDeleteAlbum);
  yield takeEvery(ALBUMS.EDIT_ALBUM, handleEditAlbum);
}
