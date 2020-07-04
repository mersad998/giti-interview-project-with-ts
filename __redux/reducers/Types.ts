export interface Action {
  type: String;
  payload: {};
}
export interface AlbumRedcer {
  albums: [];
  successMessage: String;
  errorMessage: String;
  isLoading: Boolean;
}
export interface PhotosRedcer {
  photos: [];
  url: String;
  successMessage: String;
  errorMessage: String;
  isLoading: Boolean;
}
export interface LoginRedcer {
  token: String;
  successMessage: String;
  errorMessage: String;
  isLoading: Boolean;
  user: {token?: string};
}
export interface User {
  username: String;
  password: String;
  remember: boolean;
  token: String;
}
