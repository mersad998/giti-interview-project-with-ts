import {ALBUMS, PHOTOS} from '../constants';

// Albums
const loadAlbums = ({payload, dispatch}) => {
  console.log('in loadAlbums action');
  dispatch({type: ALBUMS.LOAD, payload});
};
const setAlbums = (albums) => ({
  type: ALBUMS.LOAD_SUCCESS,
  albums,
});
const setAlbumsLoadError = (error) => ({
  type: ALBUMS.LOAD_FAIL,
  error,
});
const addNewAlbum = ({payload, dispatch}) => {
  console.log('in addNewAlbum action');
  dispatch({type: ALBUMS.ADD_NEW_ALBUM, payload});
};
const resetMessages = ({payload, dispatch}) => {
  dispatch({type: ALBUMS.RESET_MESSAGES, payload});
};
const deleteAlbum = ({payload, dispatch}) => {
  dispatch({type: ALBUMS.DELETE_ALBUM, payload});
};
const editAlbum = ({payload, dispatch}) => {
  dispatch({type: ALBUMS.EDIT_ALBUM, payload});
};

// Photos
const loadAlbumsPhotos = ({payload, dispatch}) => {
  console.log('in loadPhotos action');
  console.log(payload);
  dispatch({type: PHOTOS.LOAD, payload});
};
const setAlbumsPhotos = (id, downloads) => ({
  type: PHOTOS.LOAD_SUCCESS,
  id,
  downloads,
});
const setAlbumsPhotosLoadError = (id) => ({
  type: PHOTOS.LOAD_FAIL,
  id,
});
const uploadPhotos = ({payload, dispatch}) => {
  console.log('in uploadPhotos action');
  dispatch({type: PHOTOS.UPLOAD_PHOTOS, payload});
};
const clearPhotos = ({payload, dispatch}) => {
  dispatch({type: PHOTOS.CLEAR_PHOTOS, payload});
};
const resetPhotosMessages = ({payload, dispatch}) => {
  dispatch({type: PHOTOS.RESET_MESSAGES, payload});
};
const deletePhoto = ({payload, dispatch}) => {
  dispatch({type: PHOTOS.DELETE_PHOTO, payload});
};
const editPhoto = ({payload, dispatch}) => {
  dispatch({type: PHOTOS.EDIT_PHOTO, payload});
};
export {
  loadAlbums,
  setAlbums,
  setAlbumsLoadError,
  resetMessages,
  addNewAlbum,
  deleteAlbum,
  editAlbum,
  loadAlbumsPhotos,
  setAlbumsPhotos,
  setAlbumsPhotosLoadError,
  uploadPhotos,
  clearPhotos,
  resetPhotosMessages,
  deletePhoto,
  editPhoto,
};
