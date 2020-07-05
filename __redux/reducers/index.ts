import {combineReducers} from 'redux';
import albumsReducer from './albumsReducer';
import photosReducer from './photosReducer';
import loginReducer from './loginReducer';
import {AlbumRedcer, PhotosRedcer, LoginRedcer} from './Types';

export interface RootReducer {
  albumReducer: AlbumRedcer;
  photosReducer: PhotosRedcer;
  loginReducer: LoginRedcer;
}

const rootReducer = combineReducers({
  albumsReducer: albumsReducer,
  photosReducer: photosReducer,
  loginReducer: loginReducer,
});

export default rootReducer;
