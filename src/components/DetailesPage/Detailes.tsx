import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {
  lightGray,
  purple,
  white,
  BootstrapDanger,
  BootstrapPrimary,
  BootstrapWarning,
} from 'utils/constants/colors';
import {CoustomTextComponent} from 'utils/constants/elements';
import {MyHeader} from 'utils/constants/elements';
import {Icon, Item, Input} from 'native-base';
import {connect} from 'react-redux';
import {
  deletePhoto,
  editPhoto,
  resetPhotosMessages,
} from '../../../__redux/actions/index';
import {Error, Success, Delete} from 'utils/modals/alerts';
import SelectModal from 'utils/modals/select';
import ImagePicker from 'react-native-image-crop-picker';
import {ScrollView} from 'react-native-gesture-handler';
const txtFromCamera = 'دوربین';
const txtFromGallery = 'گالری';
import {RootReducer} from '../../../__redux/reducers';
interface DetailesInterface {
  navigation: any;
  setErrMessage: Function;
  deletePhoto: Function;
  resetPhotosMessages: Function;
  editPhoto: Function;
  successMessage?: string;
  errorMessage?: string;
  isLoading?: boolean;
}
interface ItemModel {
  desc: string | Number;
  id: string;
  img: string;
  title: string | Number;
  upload_date: string;
}
const Detailes = (props: DetailesInterface) => {
  const [item, setItem] = useState<ItemModel>();
  const [PickerItemsVisible, setPickerItemsVisible] = useState(false); // مودال انتخاب دوربین یا گالری
  const [deleteMsg, setDeleteMsg] = useState('');
  const [editingMode, setEditingMode] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPic, setNewPic] = useState('');

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
    console.log('image');

    console.log(image);

    setNewPic(image.path);
  };
  const OnSetImage = (type: string) => {
    if (type == txtFromCamera) {
      try {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then((image: any) => {
          console.log('onchoose image ');

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
        }).then((image: any) => {
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
  const onBackPress = () => {
    console.log('back called');
    console.log(editingMode);

    if (editingMode) {
      setEditingMode(false);
      return true;
    } else {
      props.navigation.goBack();
      return true;
    }
  };
  useEffect(() => {
    const passedItem = props.navigation.getParam('item');
    console.log('item in detailes page :');
    console.log(passedItem);
    setItem(passedItem);
    setNewName(passedItem.title);
    setNewDesc(passedItem.desc);
    setNewPic(passedItem.img);
  }, []);

  useEffect(() => {
    var backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return function cleanup() {
      backHandler.remove();
    };
  }, [editingMode]);

  const deletePhoto = () => {
    if (item) {
      let model = {id: item.id};
      props.deletePhoto(model);
    }
  };
  const resetDeleteMsg = () => {
    setDeleteMsg('');
  };
  const showDeleteMsg = () => {
    let msg = 'آیا برای حذف تصویر مطمئن هستید ؟';
    setDeleteMsg(msg);
  };
  const onActionCompelete = () => {
    props.resetPhotosMessages();
    props.navigation.goBack();
  };
  const onConfirmDelete = () => {
    resetDeleteMsg();
    deletePhoto();
  };
  const turnOnEditingMode = () => {
    setEditingMode(true);
  };
  const resetError = () => {
    setErrMessage('');
  };
  const onCheckPress = () => {
    interface Changes {
      title?: string | Number;
      desc?: string | Number;
      img?: string;
      id?: string | Number;
    }
    let changes: Changes = {};
    if (item) {
      if (newName !== item.title) {
        changes.title = newName;
      }
      if (newDesc !== item.desc) {
        changes.desc = newDesc;
      }
      if (newPic !== item.img) {
        changes.img = newPic;
      }
      console.log(changes);
      if (changes.title || changes.desc || changes.img) {
        changes.id = item.id;
        props.editPhoto(changes);
      } else {
        setErrMessage('هیچ مقداری تغییر داده نشده');
      }
    }
  };

  return (
    <>
      <MyHeader
        Title={editingMode ? 'ویرایش عکس' : 'جزئیات عکس'}
        onBackPress={onBackPress}
        onCheckPress={editingMode ? onCheckPress : null}
      />
      <StatusBar backgroundColor="#470425" />
      <Error
        visible={props.errorMessage != ''}
        text={props.errorMessage}
        confirm={() => props.resetPhotosMessages()}
      />
      <Error
        visible={errMessage != ''}
        text={errMessage}
        confirm={resetError}
      />
      <Success
        visible={props.successMessage != ''}
        text={props.successMessage}
        confirm={onActionCompelete}
      />
      <Delete
        visible={deleteMsg != ''}
        text={deleteMsg}
        confirm={onConfirmDelete}
        dismiss={resetDeleteMsg}
      />
      <SelectModal
        visible={PickerItemsVisible}
        dissmiss={dissmissPickerItems}
        items={[{Name: txtFromCamera}, {Name: txtFromGallery}]}
        confirm={OnSetImage}
      />
      {item && !editingMode ? (
        <View style={styles.Container}>
          <View style={styles.buttonsRowView}>
            <TouchableOpacity
              style={styles.buttonsDanger}
              onPress={showDeleteMsg}>
              <Icon name="trash" type="FontAwesome5" style={styles.icons} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonsWarning}
              onPress={turnOnEditingMode}>
              <Icon name="pen" type="FontAwesome5" style={styles.icons} />
            </TouchableOpacity>
          </View>
          <Image
            resizeMode={'stretch'}
            source={{uri: item.img}}
            style={styles.Image}
          />
          <CoustomTextComponent style={styles.HeadText}>
            جزئیات عکس {item.title}
          </CoustomTextComponent>
          <View style={styles.rowView}>
            <CoustomTextComponent style={styles.text}>
              {item.upload_date.slice(0, 4)} / {item.upload_date.slice(5, 7)} /{' '}
              {item.upload_date.slice(8, 10)}
            </CoustomTextComponent>
            <CoustomTextComponent style={styles.text}>
              تاریخ ایجاد :
            </CoustomTextComponent>
          </View>
          <View style={styles.rowViewNoborder}>
            <CoustomTextComponent style={styles.text}>
              {item.desc ? item.desc : 'بدون توضیحات'}
            </CoustomTextComponent>
            <CoustomTextComponent style={styles.text}>
              توضیحات :
            </CoustomTextComponent>
          </View>
        </View>
      ) : null}
      {item && editingMode ? (
        <ScrollView style={styles.ContainerEditing}>
          <TouchableOpacity
            style={styles.newImageContainer}
            onPress={showPickerItems}>
            <Image
              resizeMode={'stretch'}
              source={{uri: newPic}}
              style={styles.Image}
            />
            <CoustomTextComponent>
              برای ویرایش روی تصویر کلیک کنید
            </CoustomTextComponent>
          </TouchableOpacity>

          <View style={styles.rowView}>
            <Item rounded style={styles.inputItem}>
              <Input
                placeholder="نام جدید"
                placeholderTextColor={'gray'}
                style={styles.input}
                value={newName}
                onChangeText={setNewName}
                editable={!props.isLoading}
              />
              <Icon
                name="pencil"
                type="MaterialCommunityIcons"
                style={styles.inputIcon}
              />
            </Item>
            <CoustomTextComponent style={styles.text}>
              نام عکس :
            </CoustomTextComponent>
          </View>
          <View style={styles.rowViewNoborder}>
            <Item rounded style={styles.inputItem}>
              <Input
                placeholder="توضیحات جدید"
                placeholderTextColor={'gray'}
                style={styles.input}
                value={newDesc}
                onChangeText={setNewDesc}
                editable={!props.isLoading}
              />
              <Icon
                name="pencil"
                type="MaterialCommunityIcons"
                style={styles.inputIcon}
              />
            </Item>
            <CoustomTextComponent style={styles.text}>
              توضیحات عکس :
            </CoustomTextComponent>
          </View>
        </ScrollView>
      ) : null}
      <Image
        resizeMode={'stretch'}
        source={require('assets/footer.png')}
        style={styles.footerImage}
      />
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: lightGray,
  },
  ContainerEditing: {
    flex: 1,
    backgroundColor: lightGray,
  },
  buttonsRowView: {
    alignSelf: 'flex-start',
    height: 45,
    width: 120,
    marginLeft: 20,
    marginTop: 10,
    flexDirection: 'row',
  },
  buttonsDanger: {
    flex: 1,
    padding: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BootstrapDanger,
  },
  buttonsWarning: {
    flex: 1,
    padding: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BootstrapWarning,
  },
  icons: {
    fontSize: 20,
    color: white,
  },
  footerImage: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
  },
  HeadText: {
    marginTop: 15,
    fontSize: 16,
    width: '90%',
    borderColor: 'grey',
    borderWidth: 0.5,
    textAlign: 'center',
  },
  rowView: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
  },
  rowViewNoborder: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    padding: 5,
    alignSelf: 'center',
  },
  text: {
    flex: 1,
  },
  Image: {
    width: 200,
    height: 200,
    margin: 10,
    borderColor: purple,
    borderWidth: 1,
  },
  inputItem: {
    backgroundColor: white,
    borderColor: purple,
    marginBottom: 8,
    height: 45,
    borderRadius: 8,
    width: '60%',
    alignSelf: 'center',
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
  newImageContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state: RootReducer) => ({
  successMessage: state.photosReducer.successMessage,
  errorMessage: state.photosReducer.errorMessage,
  isLoading: state.photosReducer.isLoading,
});
interface EditPhoto {
  title?: string | Number;
  desc?: string | Number;
  img?: string;
  id?: string | Number;
}

const mapDispatchToProps = (dispatch: Function) => ({
  deletePhoto: (payload: {id: string | number}) =>
    deletePhoto({payload, dispatch}),
  resetPhotosMessages: (payload: any) =>
    resetPhotosMessages({payload, dispatch}),
  editPhoto: (payload: EditPhoto) => editPhoto({payload, dispatch}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detailes);
