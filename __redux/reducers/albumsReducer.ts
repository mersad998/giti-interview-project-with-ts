import {ALBUMS} from '../constants';
import {AlbumRedcer} from './Types';
const albumsReducer = (
  state = {albums: [], successMessage: '', errorMessage: '', isLoading: false},
  action: any,
) => {
  switch (action.type) {
    case ALBUMS.START_ISLOADING:
      return {...state, isLoading: true};
      break;
    case ALBUMS.STOP_ISLOADING:
      return {...state, isLoading: false};
      break;

    case ALBUMS.LOAD_SUCCESS:
      console.log('in reducer :');
      console.log(action);
      return {...state, albums: action.images};
      break;

    case ALBUMS.ADD_NEW_ALBUM_SUCCESS:
      return {...state, successMessage: 'آلبوم با موفقیت ایجاد شد'};
      break;

    case ALBUMS.ADD_NEW_ALBUM_FAILED:
      if (action.error.message === 'Request failed with status code 500') {
        return {
          ...state,
          errorMessage: 'نام آلبوم تکراریست . لطفا از نام دیگری استفاده نمایید',
        };
      } else {
        return {
          ...state,
          errorMessage: 'خطایی در ایجاد آلبوم . لطفا دوباره تلاش نمایید',
        };
      }
      break;
    case ALBUMS.RESET_MESSAGES:
      return {...state, errorMessage: '', successMessage: ''};
      break;
    case ALBUMS.DELETE_ALBUM_SUCCESS:
      return {...state, successMessage: 'آلبوم با موفقیت حذف شد'};
      break;
    case ALBUMS.DELETE_ALBUM_FAILED:
      return {
        ...state,
        errorMessage: 'عملیات انجام نشد . لطفا مجددا تلاش نمایید',
      };
      break;
    case ALBUMS.EDIT_ALBUM_SUCCESS:
      return {...state, successMessage: 'نام آلبوم با موفقیت ویرایش شد'};
      break;
    case ALBUMS.EDIT_ALBUM_FAILED:
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

export default albumsReducer;
