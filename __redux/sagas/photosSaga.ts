import {put, call, takeEvery, select} from 'redux-saga/effects';
import {PHOTOS} from '../constants';
import {
  getPhotosOfAnAlbum,
  uploadPhotoApi,
  editPhotoApi,
  deletePhotoApi,
} from '../api/index';

export const getUrl = (state: any) => state.photosReducer.url;
export const getToken = (state: any) => state.loginReducer.user.token;

export function* handleImagesLoad(data: any) {
  try {
    console.log('handleImagesLoad called');
    data.token = yield select(getToken);
    let url = yield select(getUrl);
    data.url = url;
    if (url) {
      yield put({type: PHOTOS.START_ISLOADING});
      const images = yield call(getPhotosOfAnAlbum, data);
      yield put({type: PHOTOS.STOP_ISLOADING});
      yield put({type: PHOTOS.LOAD_SUCCESS, images});
    }
  } catch (error) {
    yield put({type: PHOTOS.STOP_ISLOADING});
    // should set err
  }
}
export function* handleUploadPhotos(data: any) {
  try {
    console.log('handleUploadPhotos called');
    yield put({type: PHOTOS.START_ISLOADING});
    data.token = yield select(getToken);
    const result = yield call(uploadPhotoApi, data);
    yield put({type: PHOTOS.STOP_ISLOADING});
    yield put({type: PHOTOS.ADD_PHOTO_SUCCESS});
    console.log('saga ok');
  } catch (error) {
    yield put({type: PHOTOS.STOP_ISLOADING});
    yield put({type: PHOTOS.ADD_PHOTO_FAILED});
    console.log('saga failed');
    console.log(error);
  }
}
export function* handleEditPhoto(data: any) {
  try {
    console.log('handleEditPhoto called');
    data.token = yield select(getToken);
    yield put({type: PHOTOS.START_ISLOADING});
    const resault = yield call(editPhotoApi, data);
    yield put({type: PHOTOS.STOP_ISLOADING});
    yield put({type: PHOTOS.EDIT_PHOTO_SUCCESS, resault});
  } catch (error) {
    yield put({type: PHOTOS.STOP_ISLOADING});
    yield put({type: PHOTOS.EDIT_PHOTO_FAILED, error});
  }
}
export function* handleDeletePhoto(data: any) {
  try {
    console.log('handleDeletePhoto called');
    data.token = yield select(getToken);
    yield put({type: PHOTOS.START_ISLOADING});
    const resault = yield call(deletePhotoApi, data);
    yield put({type: PHOTOS.STOP_ISLOADING});
    yield put({type: PHOTOS.DELETE_PHOTO_SUCCESS, resault});
  } catch (error) {
    yield put({type: PHOTOS.STOP_ISLOADING});
    yield put({type: PHOTOS.DELETE_PHOTO_FAILED, error});
  }
}

export default function* watchImagesLoad() {
  yield takeEvery(PHOTOS.LOAD, handleImagesLoad);
  yield takeEvery(PHOTOS.UPLOAD_PHOTOS, handleUploadPhotos);
  yield takeEvery(PHOTOS.EDIT_PHOTO, handleEditPhoto);
  yield takeEvery(PHOTOS.DELETE_PHOTO, handleDeletePhoto);
}
