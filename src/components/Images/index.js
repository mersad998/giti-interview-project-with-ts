import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { lightGray, purple, white } from 'utils/constants/colors';
import { MyHeader, CoustomTextComponent, MySpinner } from 'utils/constants/elements';
import { loadAlbumsPhotos, clearPhotos } from '../../../__redux/actions'
import { connect } from 'react-redux';
import CustomDrawer from '../../utils/constants/CustomDrawer'
import SideMenu from 'react-native-side-menu';
import { Content } from 'native-base';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Images = (props) => {
    const [drawer, setDrawer] = useState(false);
    const onAddIconPress = () => {
        props.navigation.navigate('UploadPhoto', {
            albumName: props.navigation.getParam('albumName', ''),
            photosNames: Array.from(props.photos.map(x => x.title))
        })
    }
    function afterToggleDrawer(state) {
        setTimeout(() => {
            setDrawer(state);
        }, 100);
    }
    const toggleNavBar = () => setDrawer(prevDrawer => !prevDrawer);
    const onBackPress = () => {
        props.navigation.goBack();
    };
    const loadPage = () => {
        const AlbumName = props.navigation.getParam('albumName', '')
        props.loadAlbumsPhotos(AlbumName);
    };
    const gotoDetailes = item => {
        console.log(item.item);
        props.navigation.navigate('Detailes', { item: item.item });
    };
    const clearPage = () => {
        props.clearPhotos()
    }
    const hardReload = () => {
        clearPage();
        loadPage()
    }

    useEffect(() => {
        console.log('use effect Images');
        loadPage()
        return clearPage
    }, []);

    const renderItems = (item, index) => {
        return (
            <TouchableOpacity
                style={styles.CartContainer}
                onPress={() => gotoDetailes(item)}>
                <View style={styles.CardTitle} >
                    <CoustomTextComponent style={styles.title}>{item.item.title ? item.item.title : 'بدون نام'}</CoustomTextComponent>
                </View>
                <Image
                    resizeMode={'stretch'}
                    source={{ uri: item.item.img }}
                    style={styles.Image}
                />

            </TouchableOpacity>
        );
    };

    return (
        <SideMenu
            menu={<CustomDrawer navigation={props.navigation} />}
            menuPosition="right"
            onChange={state => {
                afterToggleDrawer(state);
            }}
            isOpen={drawer}
            bounceBackOnOverdraw={false}>
            <MyHeader Title="عکس های آلبوم" onPlusPress={onAddIconPress} onHamburgerPress={toggleNavBar} onBackPress={onBackPress} />
            <StatusBar backgroundColor="#470425" />
            <View style={styles.Container}>
                {props.isLoading && props.photos.length < 1 ? (
                    <>
                        <MySpinner />
                        <CoustomTextComponent>در حال بارگذاری</CoustomTextComponent>
                    </>
                ) : null}
                {props.photos && props.photos.length > 0 ? (
                    <FlatList
                        style={styles.FlatList}
                        data={props.photos}
                        maxToRenderPerBatch={8}
                        initialNumToRender={8}
                        windowSize={8}
                        keyExtractor={i => i.ID}
                        renderItem={renderItems}
                        onEndReached={() => {
                            if (!props.isLoading) {
                                loadPage();
                            }
                        }}
                        onEndReachedThreshold={0.9}
                        refreshControl={
                            <RefreshControl
                                refreshing={props.isLoading}
                                onRefresh={hardReload}
                            />
                        }
                    />
                ) : null}
                {props.photos.length == 0 && !props.isLoading ? (
                    <Content
                        refreshControl={
                            <RefreshControl
                                refreshing={props.isLoading}
                                onRefresh={hardReload}
                            />
                        } >
                        <CoustomTextComponent style={styles.noPhotoText}>عکسی برای نمایش وجود ندارد</CoustomTextComponent>
                    </Content>
                ) : null}
            </View>
        </SideMenu>
    );
}

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
        height: deviceWidth - 20,
        margin: 2,
        alignSelf: 'center',
        borderColor: purple,
        borderWidth: 0.5,
        backgroundColor: '#e4e9ed',
        borderRadius: 30
    }, CardTitle: {
        width: '84%',
        height: 30,
        backgroundColor: purple,
        alignSelf: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: 'grey',
        borderWidth: 0.5,
        alignItems: 'center'
    }, title: {
        color: white
    },
    Image: {
        width: '90%',
        height: '90%',
        alignSelf: 'center',
        marginTop: '1%',
        borderRadius: 6
    }, Grid: {
        flex: 1,
        margin: 10
    }, rowView: {
        flex: 1,
        flexDirection: 'row'
    }, Tile: {
        flex: 1,
        margin: 1,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'grey',
        backgroundColor: lightGray,
        justifyContent: 'center'
    }, noPhotoText: {
        marginTop: deviceHeight / 2.5
    }
});

const mapStateToProps = state => ({
    photos: state.photosReducer.photos,
    isLoading: state.photosReducer.isLoading,

});
const mapDispatchToProps = dispatch => ({
    loadAlbumsPhotos: data => loadAlbumsPhotos({ data, dispatch }),
    clearPhotos: data => clearPhotos({ data, dispatch }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Images);
