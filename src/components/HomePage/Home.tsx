import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {lightGray, purple} from 'utils/constants/colors';
import {
  MyHeader,
  CoustomTextComponent,
  MySpinner,
} from 'utils/constants/elements';
import {NamePicker} from 'utils/modals/NamePicker';
import {
  loadAlbums,
  addNewAlbum,
  resetMessages,
  deleteAlbum,
  editAlbum,
} from '../../../__redux/actions';
import {connect} from 'react-redux';
import CustomDrawer from '../../utils/constants/CustomDrawer';
import SideMenu from 'react-native-side-menu';
const deviceWidth = Dimensions.get('window').width;
import {Error, Success, Delete} from 'utils/modals/alerts';
import SelectModal from 'utils/modals/select';
import {Content} from 'native-base';
const txtDelete = 'حذف آلبوم';
const txtEdit = 'ویرایش نام آلبوم';
const deviceHeight = Dimensions.get('window').height;
import {RootReducer} from '../../../__redux/reducers';

const Home = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectModalVisible, setSelectModalVisible] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);

  const visibleModall = () => {
    setShowModal(true);
  };
  const dissmissModall = () => {
    setShowModal(false);
  };
  function afterToggleDrawer(state: boolean) {
    setTimeout(() => {
      setDrawer(state);
    }, 100);
  }
  const toggleNavBar = () => {
    setDrawer((prevDrawer) => !prevDrawer);
  };
  const loadPage = () => {
    props.loadAlbums();
  };
  const gotoPhotos = (item: {item: {name: string}}) => {
    props.navigation.navigate('Images', {albumName: item.item.name});
  };
  const resetDeleteMsg = () => {
    setDeleteMsg('');
  };
  const showDeleteMsg = () => {
    let msg = 'آیا برای حذف آلبوم ' + selectedItem + ' مطمئن هستید ؟';
    setDeleteMsg(msg);
  };
  const onConfirmDelete = () => {
    resetDeleteMsg();
    props.deleteAlbum(selectedItem);
    loadPage();
  };
  const showSelectModal = (name) => {
    setSelectedItem(name);
    setSelectModalVisible(true);
  };
  const dissmissSelectModal = () => {
    setSelectModalVisible(false);
  };
  const onChooseNewName = (newName: string | Number) => {
    setShowEditNameModal(false);
    let model = {
      prevName: selectedItem,
      newName: newName,
    };
    props.editAlbum(model);
    loadPage();
  };
  useEffect(() => {
    console.log('use effect home');

    loadPage();
  }, []);

  const renderItems = (item: any, index: Number) => {
    return (
      <TouchableOpacity
        style={styles.CartContainer}
        onPress={() => gotoPhotos(item)}
        onLongPress={() => {
          showSelectModal(item.item.name);
        }}>
        <View style={styles.CardTitle}>
          <CoustomTextComponent>
            {item.item.name ? item.item.name : 'بدون نام'}
          </CoustomTextComponent>
        </View>
        <View style={styles.Grid}>
          <View style={styles.rowView}>
            <View style={styles.Tile}>
              <Image
                resizeMode={'stretch'}
                source={
                  item.item.pictures[0]
                    ? {uri: item.item.pictures[0]}
                    : require('assets/noImage.png')
                }
                style={styles.Image}
              />
            </View>
            <View style={styles.Tile}>
              <Image
                resizeMode={'stretch'}
                source={
                  item.item.pictures[1]
                    ? {uri: item.item.pictures[1]}
                    : require('assets/noImage.png')
                }
                style={styles.Image}
              />
            </View>
          </View>
          <View style={styles.rowView}>
            <View style={styles.Tile}>
              <Image
                resizeMode={'stretch'}
                source={
                  item.item.pictures[2]
                    ? {uri: item.item.pictures[2]}
                    : require('assets/noImage.png')
                }
                style={styles.Image}
              />
            </View>
            <View style={styles.Tile}>
              <Image
                resizeMode={'stretch'}
                source={
                  item.item.pictures[3]
                    ? {uri: item.item.pictures[3]}
                    : require('assets/noImage.png')
                }
                style={styles.Image}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onSelectOperation = (type: string) => {
    switch (type) {
      case txtDelete:
        dissmissSelectModal();
        showDeleteMsg();
        break;
      case txtEdit:
        dissmissSelectModal();
        setShowEditNameModal(true);
        break;
      default:
        dissmissSelectModal();
        break;
    }
    console.log(type);
  };

  const onSetNewAlbumName = (val) => {
    dissmissModall();
    props.addNewAlbum(val);
  };
  const onCreatedAlbumCompelete = () => {
    dissmissModall();
    props.resetMessages();
  };

  return (
    <SideMenu
      menu={<CustomDrawer navigation={props.navigation} />}
      menuPosition="right"
      onChange={(state) => {
        afterToggleDrawer(state);
      }}
      isOpen={drawer}
      bounceBackOnOverdraw={false}>
      <MyHeader
        Title="آلبوم عکس شما"
        onPlusPress={visibleModall}
        onHamburgerPress={toggleNavBar}
      />
      <StatusBar backgroundColor="#470425" />
      <NamePicker
        text="لطفا نام آلبوم جدید را وارد نمایید"
        visible={showModal}
        confirm={onSetNewAlbumName}
        dissmiss={dissmissModall}
      />
      <NamePicker
        text="لطفا نام جدید را وارد نمایید"
        visible={showEditNameModal}
        confirm={onChooseNewName}
        dissmiss={() => setShowEditNameModal(false)}
      />

      <View style={styles.Container}>
        <SelectModal
          visible={selectModalVisible}
          dissmiss={dissmissSelectModal}
          items={[{Name: txtDelete}, {Name: txtEdit}]}
          confirm={onSelectOperation}
        />
        <Error
          visible={props.errorMessage != ''}
          text={props.errorMessage}
          confirm={props.resetMessages}
        />
        <Success
          visible={props.successMessage != ''}
          text={props.successMessage}
          confirm={onCreatedAlbumCompelete}
        />
        <Delete
          visible={deleteMsg != ''}
          text={deleteMsg}
          confirm={onConfirmDelete}
          dismiss={resetDeleteMsg}
        />
        {props.isLoading ? (
          <>
            <MySpinner />
            <CoustomTextComponent>در حال بارگذاری</CoustomTextComponent>
          </>
        ) : null}
        {props.albums && props.albums.length > 0 && !props.isLoading ? (
          <FlatList
            style={styles.FlatList}
            data={props.albums}
            maxToRenderPerBatch={8}
            initialNumToRender={8}
            windowSize={8}
            keyExtractor={(i) => i.ID}
            renderItem={renderItems}
            onEndReachedThreshold={0.9}
            refreshControl={
              <RefreshControl
                refreshing={props.isLoading}
                onRefresh={() => loadPage(true)}
              />
            }
          />
        ) : null}
        {props.albums && props.albums.length < 1 && !props.isLoading ? (
          <Content
            refreshControl={
              <RefreshControl
                refreshing={props.isLoading}
                onRefresh={loadPage}
              />
            }>
            <CoustomTextComponent style={styles.noPhotoText}>
              آلبومی برای نمایش وجود ندارد
            </CoustomTextComponent>
          </Content>
        ) : null}
      </View>
    </SideMenu>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightGray,
  },
  FlatList: {
    flex: 1,
    width: '100%',
  },
  CartContainer: {
    width: deviceWidth - 20,
    height: deviceWidth - 50,
    margin: 10,
    alignSelf: 'center',
    borderColor: purple,
    borderWidth: 0.5,
    backgroundColor: purple,
    borderRadius: 30,
  },
  CardTitle: {
    width: '84%',
    height: 30,
    backgroundColor: '#c9ccd1',
    alignSelf: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
    alignItems: 'center',
  },
  Image: {
    width: '85%',
    height: '85%',
    alignSelf: 'center',
  },
  Grid: {
    flex: 1,
    margin: 10,
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
  },
  Tile: {
    flex: 1,
    margin: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    backgroundColor: lightGray,
    justifyContent: 'center',
  },
  noPhotoText: {
    marginTop: deviceHeight / 2.5,
  },
});
const mapStateToProps = (state: RootReducer) => ({
  albums: state.albumsReducer.albums,
  successMessage: state.albumsReducer.successMessage,
  errorMessage: state.albumsReducer.errorMessage,
  isLoading: state.albumsReducer.isLoading,
});
const mapDispatchToProps = (dispatch: Function) => ({
  loadAlbums: (payload) => loadAlbums({payload, dispatch}),
  addNewAlbum: (payload) => addNewAlbum({payload, dispatch}),
  resetMessages: (payload: any) => resetMessages({payload, dispatch}),
  deleteAlbum: (payload) => deleteAlbum({payload, dispatch}),
  editAlbum: (payload) => editAlbum({payload, dispatch}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
