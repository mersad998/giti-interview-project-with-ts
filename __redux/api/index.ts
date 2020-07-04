import axios from 'axios';
import {
  loginUrl,
  signUpUrl,
  getAllAlbumsUrl,
  selectAlbumUrl,
  selectImageUrl,
} from './urls';

interface LoginModel {
  payload: {
    username: string;
    password: string;
    remember?: boolean;
  };
}
interface SignUpModel {
  data: {
    username: string;
    email: string;
    password: string;
  };
}
interface AddNewAlbumApi {
  token: string;
  data: {};
}
interface GetPhotosOfAnAlbum {
  token: string;
  url?: string;
  data?: string;
}
interface DeleteAnAlbumApi {
  token: string;
  data: string;
}
interface EditAnAlbumApi {
  token: string;
  data: {
    prevName: string;
    newName: string;
  };
}
interface DeletePhotoApi {
  token: string;
  data: {id: string};
}
interface EditPhotoApi {
  token: string;
  data: {
    id: string;
    title: string | Number;
    desc: string | Number;
    img: any;
  };
}

export const LoginApi = (data: LoginModel) => {
  console.log('in login api');
  console.log(data);

  return new Promise(async (resolve, reject) => {
    axios
      .post(loginUrl, {
        username: data.payload.username,
        password: data.payload.password,
      })
      .then((res) => {
        console.log('status 200');
        console.log(res.data);
        resolve(res.data.token);
      })
      .catch((err) => {
        console.log('err in api');
        console.log(err);
        reject(err);
      });
  });
};
export const SignupApi = (data: SignUpModel) => {
  console.log('in SignupApi :');
  console.log(data.data);

  return new Promise(async (resolve, reject) => {
    axios
      .post(signUpUrl, {
        username: data.data.username,
        email: data.data.email,
        password: data.data.password,
      })
      .then((res) => {
        console.log('status 200');
        console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        console.log('err in api');
        console.log(err);
        reject(err);
      });
  });
};
export const getAllAlbums = (token: string) => {
  console.log('JWT ' + token);
  return new Promise(async (resolve, reject) => {
    await axios
      .get(getAllAlbumsUrl, {
        headers: {
          Authorization: 'JWT ' + token,
        },
      })
      .then((res) => {
        console.log('status 200');
        resolve(res.data);
      })
      .catch((err) => {
        console.log('err in api');
        console.log(err);
        reject(err);
      });
  });
};
export const addNewAlbumApi = (data: AddNewAlbumApi) => {
  console.log(data);

  const token = 'JWT ' + data.token;
  const url = getAllAlbumsUrl;
  console.log(url, token);

  return new Promise(async (resolve, reject) => {
    await axios
      .post(
        url,
        {name: data.data},
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        console.log('status 200');
        resolve(res.data);
      })
      .catch((err) => {
        console.log('err in api');
        reject(err);
      });
  });
};
export const getPhotosOfAnAlbum = (data: GetPhotosOfAnAlbum) => {
  console.log(data);
  let url: string;
  if (!data.url) {
    console.log('endOfPage');
    return;
  }
  if (data.url === 'firstLoad') {
    url = selectAlbumUrl + data.data + '/pictures';
  } else {
    console.log('now in api we have new url');
    url = data.url;
    console.log(data.url);
  }
  const token = 'JWT ' + data.token;
  return new Promise(async (resolve, reject) => {
    await axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log('status 200');
        console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        console.log('err in api');
        console.log(err);

        reject(err);
      });
  });
};
export const uploadPhotoApi = async (data: any) => {
  const token = 'JWT ' + data.token;
  const url = selectAlbumUrl + data.data.albumName + '/pictures';
  console.log('in api :');
  console.log(data);

  let formData = new FormData();
  formData.append('title', data.data.title);
  formData.append('desc', data.data.desc ? data.data.desc : '');
  let localUri = data.data.path;
  let filename = localUri.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : 'image';
  console.log(formData);

  formData.append('img', {
    uri: localUri,
    name: filename,
    type,
  });

  return new Promise(async (resolve, reject) => {
    await axios
      .post(url, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: token,
        },
      })
      .then((res) => {
        console.log('status 200');
        resolve(res.data);
      })
      .catch((err) => {
        console.log('err in api');
        reject(err);
      });
  });
};
export const deleteAnAlbumApi = (data: DeleteAnAlbumApi) => {
  const token = 'JWT ' + data.token;
  const url = selectAlbumUrl + data.data;
  return new Promise(async (resolve, reject) => {
    await axios
      .delete(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log('status 200');
        resolve(res.data);
      })
      .catch((err) => {
        console.log('err in api');
        reject(err);
      });
  });
};
export const editAnAlbumApi = (data: EditAnAlbumApi) => {
  const token = 'JWT ' + data.token;
  const url = selectAlbumUrl + data.data.prevName;
  return new Promise(async (resolve, reject) => {
    await axios
      .put(
        url,
        {name: data.data.newName},
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        console.log('status 200');
        resolve(res.data);
      })
      .catch((err) => {
        console.log('err in api');
        reject(err);
      });
  });
};
export const deletePhotoApi = (data: DeletePhotoApi) => {
  const token = 'JWT ' + data.token;
  const url = selectImageUrl + data.data.id;
  console.log(url, token);
  return new Promise(async (resolve, reject) => {
    await axios
      .delete(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log('status 200');
        resolve(res.data);
      })
      .catch((err) => {
        console.log('err in api');
        reject(err);
      });
  });
};
export const editPhotoApi = (data: EditPhotoApi) => {
  console.log('in api');
  console.log(data);
  const token = 'JWT ' + data.token;
  const url = selectImageUrl + data.data.id;
  console.log(url, token);

  let formData = new FormData();
  if (data.data.title) {
    formData.append('title', data.data.title);
  }
  if (data.data.desc) {
    formData.append('desc', data.data.desc);
  }
  if (data.data.img) {
    let localUri = data.data.img;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : 'image';
    formData.append('img', {
      uri: localUri,
      name: filename,
      type,
    });
  }

  console.log(formData);

  return new Promise(async (resolve, reject) => {
    await axios
      .patch(url, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: token,
        },
      })
      .then((res) => {
        console.log('status 200');
        resolve(res.data);
      })
      .catch((err) => {
        console.log('err in api');
        reject(err);
      });
  });
};
