import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {lightGray, purple, white} from 'utils/constants/colors';
import {CoustomTextComponent} from 'utils/constants/elements';
import {MyHeader} from 'utils/constants/elements';
import SelectModal from 'utils/modals/select';
import ImagePicker from 'react-native-image-crop-picker';
import {Icon, Item, Input} from 'native-base';
import ImageCarousel from 'react-native-image-carousel';
const deviceWidth = Dimensions.get('window').width;
import {uploadPhotos, resetPhotosMessages} from '../../../__redux/actions';
import {connect} from 'react-redux';
import {Error, Success} from 'utils/modals/alerts';
import {ScrollView} from 'react-native-gesture-handler';
import {RootReducer} from '../../../__redux/reducers';
interface UploadPhotoInterface {
  successMessage: string;
  errorMessage: string;
  navigation: any;
  uploadPhotos: Function;
  setErrMessage: Function;
  resetPhotosMessages: Function;
}
const UploadPhoto = (props: UploadPhotoInterface) => {
  const onBackPress = () => {
    props.navigation.goBack();
  };
  const txtFromCamera = 'دوربین';
  const txtFromGallery = 'گالری';
  const [PickerItemsVisible, setPickerItemsVisible] = useState(false); // مودال انتخاب دوربین یا گالری
  const [photos, setPhotos] = useState([]);
  const [errMessage, setErrMessage] = useState('');
  const imagesRef = useRef(null);

  const showPickerItems = () => {
    setPickerItemsVisible(true);
  };
  const dissmissPickerItems = () => {
    setPickerItemsVisible(false);
  };
  interface Image {
    cropRect?: {height?: Number; width?: Number; x?: Number; y?: Number};
    height?: Number;
    mime?: string;
    modificationDate?: string;
    path: string;
    size?: Number;
    width?: Number;
  }
  const onChooseImage = (image: Image) => {
    console.log(image);

    let newphotos = [...photos];
    newphotos.push({path: image.path, image});
    setPhotos(newphotos);
  };

  const resetError = () => {
    setErrMessage('');
  };
  const Save = () => {
    let hatNotTitle = photos.filter((x) => !x.title).length;
    if (+hatNotTitle) {
      console.log('err');
      let message =
        'تعداد ' + String(hatNotTitle) + ' عکس بدون عنوان وجود  دارد.';
      setErrMessage(message);
      return;
    }

    let albumPhotosNames = props.navigation.getParam('photosNames');
    if (
      albumPhotosNames &&
      albumPhotosNames.length > 0 &&
      albumPhotosNames.includes(photos[0].title)
    ) {
      setErrMessage('این نام از قبل در آلبوم وجود دارد');
      return;
    }
    try {
      const albumName = props.navigation.getParam('albumName', '');
      let model = photos[0];
      model.albumName = albumName;
      props.uploadPhotos(model);
    } catch {
      console.log('err');
    }
  };
  const OnSetImage = (type) => {
    if (type == txtFromCamera) {
      try {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then((image) => {
          onChooseImage(image);
        });
      } catch (error) {
        props.setErrMessage(
          'خطایی در باز کردن دوربین اتفاق افتاده . لطفا از روش انتخاب از گالری استفاده نمایید یا دسترسی به دوربین را از منوی تنظیمات گوشی خود برای این اپلیکیشن فراهم آورید',
        );
        console.log('errrrrrrrrrr');
      }
    } else if (type == txtFromGallery) {
      try {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then((image) => {
          onChooseImage(image);
        });
      } catch (error) {
        props.setErrMessage(
          'خطایی در باز کردن گالری اتفاق افتاده . لطفا از روش دوربین استفاده نمایید یا دسترسی به گالری را از منوی تنظیمات گوشی خود برای این اپلیکیشن فراهم آورید',
        );
      }
    }
    dissmissPickerItems();
  };
  function renderHeader() {
    return (
      <TouchableWithoutFeedback onPress={imagesRef.close}>
        <View>
          <CoustomTextComponent> </CoustomTextComponent>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  function renderFooter() {
    return <CoustomTextComponent> </CoustomTextComponent>;
  }
  function renderContent(idx) {
    return (
      <Image
        style={styles.Container}
        source={{uri: photos[idx].path}}
        resizeMode={'contain'}
      />
    );
  }

  const handleChangeTitleChange = (title: string | Number, index: Number) => {
    let newphotos = [...photos];
    newphotos[index].title = title;
    setPhotos(newphotos);
  };
  const handleChangeDescription = (desc: string | Number, index: Number) => {
    let newphotos = [...photos];
    newphotos[index].desc = desc;
    setPhotos(newphotos);
  };
  const showToast = () => {
    ToastAndroid.show('فعلا فقط یک عکس مجاز میباشد', ToastAndroid.SHORT);
  };
  const onAddPhotoCompelete = () => {
    props.resetPhotosMessages();
    setTimeout(() => {
      onBackPress();
    }, 100);
  };

  return (
    <>
      <MyHeader
        Title="افزودن عکس"
        onBackPress={onBackPress}
        onCheckPress={photos.length > 0 ? Save : null}
      />
      <StatusBar backgroundColor="#470425" />
      <View style={styles.Container}>
        <Error
          visible={errMessage != ''}
          text={errMessage}
          confirm={resetError}
        />
        <Error
          visible={props.errorMessage != ''}
          text={props.errorMessage}
          confirm={props.resetPhotosMessages}
        />
        <Success
          visible={props.successMessage != ''}
          text={props.successMessage}
          confirm={onAddPhotoCompelete}
        />
        <SelectModal
          visible={PickerItemsVisible}
          dissmiss={dissmissPickerItems}
          items={[{Name: txtFromCamera}, {Name: txtFromGallery}]}
          confirm={OnSetImage}
        />
        {!photos || photos.length < 1 ? (
          <>
            <View style={styles.noPhotoContainer}>
              <CoustomTextComponent style={styles.noPhotoText}>
                عکسی انتخاب نشده
              </CoustomTextComponent>
            </View>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={showPickerItems}>
                <Icon
                  name="camera"
                  type="MaterialCommunityIcons"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <CoustomTextComponent style={styles.AddPic}>
                افزودن عکس
              </CoustomTextComponent>
            </View>
          </>
        ) : null}
        {photos && photos.length > 0 ? (
          <>
            <View style={styles.PhotoContainer}>
              <ImageCarousel
                ref={imagesRef}
                renderContent={renderContent}
                renderHeader={renderHeader}
                renderFooter={renderFooter}>
                {photos.map((url, index) => (
                  <ScrollView>
                    <Image
                      key={url.path}
                      style={styles.sliderImage}
                      source={{uri: url.path}}
                      resizeMode={'contain'}
                    />
                    <Item rounded style={styles.inputItem}>
                      <Input
                        placeholder="عنوان عکس"
                        placeholderTextColor={'gray'}
                        style={styles.input}
                        onChangeText={(txt) =>
                          handleChangeTitleChange(txt, index)
                        }
                      />
                      <Icon
                        name="pencil"
                        type="MaterialCommunityIcons"
                        style={styles.inputIcon}
                      />
                    </Item>
                    <Item rounded style={styles.inputItem}>
                      <Input
                        placeholder="توضیحات عکس"
                        placeholderTextColor={'gray'}
                        style={styles.input}
                        onChangeText={(txt) =>
                          handleChangeDescription(txt, index)
                        }
                      />
                      <Icon
                        name="pencil"
                        type="MaterialCommunityIcons"
                        style={styles.inputIcon}
                      />
                    </Item>
                  </ScrollView>
                ))}
              </ImageCarousel>
            </View>
            <CoustomTextComponent>
              تعداد عکس های انتخاب شده :{photos.length}
            </CoustomTextComponent>

            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                style={styles.iconContainerWithItem}
                onPress={showToast}>
                <Icon
                  name="camera"
                  type="MaterialCommunityIcons"
                  style={styles.iconWithItem}
                />
              </TouchableOpacity>
              <CoustomTextComponent style={styles.AddPic}>
                افزودن عکس
              </CoustomTextComponent>
            </View>
          </>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: lightGray,
  },
  noPhotoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  PhotoContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPhotoText: {
    color: 'grey',
  },
  ButtonContainer: {
    flex: 1,
    width: '90%',
    marginBottom: 30,
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
  },
  icon: {
    fontSize: 50,
    color: 'grey',
  },
  iconWithItem: {
    fontSize: 25,
    color: 'grey',
  },
  iconContainer: {
    width: 180,
    height: 180,
    backgroundColor: lightGray,
    borderColor: 'grey',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  iconContainerWithItem: {
    width: 100,
    height: 100,
    backgroundColor: lightGray,
    borderColor: 'grey',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  AddPic: {
    alignSelf: 'center',
    color: purple,
  },
  sliderImage: {
    marginTop: 5,
    height: 200,
    width: deviceWidth,
  },
  inputItem: {
    backgroundColor: white,
    borderColor: purple,
    height: 45,
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
    marginTop: 15,
  },
  input: {
    textAlign: 'right',
    color: purple,
    paddingLeft: 32,
    fontFamily: 'IRANSansMobile(FaNum)',
    fontSize: 14,
  },
  inputIcon: {
    color: purple,
    fontSize: 20,
    marginLeft: 5,
  },
});

const mapStateToProps = (state: RootReducer) => ({
  successMessage: state.photosReducer.successMessage,
  errorMessage: state.photosReducer.errorMessage,
});

const mapDispatchToProps = (dispatch: Function) => ({
  uploadPhotos: (payload) => uploadPhotos({payload, dispatch}),
  resetPhotosMessages: (payload: any) =>
    resetPhotosMessages({payload, dispatch}),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadPhoto);
