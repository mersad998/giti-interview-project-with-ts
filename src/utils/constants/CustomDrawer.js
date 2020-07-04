import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CoustomTextComponent } from 'utils/constants/elements';
import { purple, white, lightGray } from './colors';
import { Icon, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { userLogout } from '../../../__redux/actions/authActions';
import { removeUser } from 'utils/database/userData'

const CoustomDrawer = props => {

  useEffect(() => {
    console.log('use effect drawer');
    console.log(props.user)
    if (!props.user.token) {
      props.navigation.replace('LoginPage')
    }
  }, [props.user]);

  const Logout = async () => {
    await removeUser()
    props.userLogout()
  }

  const Item = ({ name, iconName, onPress, tomato }) => {
    return (
      <TouchableOpacity
        style={styles.drawerItemContainer}
        onPress={onPress}>
        <Icon
          type="FontAwesome"
          name={iconName}
          style={tomato ? styles.drawerItemIconTomato : styles.drawerItemIcon}
          color={white}
        />
        <CoustomTextComponent style={tomato ? styles.drawerItemTextTomato : styles.drawerItemText}>
          {name}
        </CoustomTextComponent>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View style={styles.Header}>
        <Thumbnail source={require('assets/avatar.png')} />
        <CoustomTextComponent style={styles.HeaderTitle}> کاربر {props.user.username} خوش آمدید</CoustomTextComponent>
      </View>
      <View style={styles.Container}>
        <Item name='آلبوم های من' iconName='file-image-o' onPress={() => props.navigation.navigate('Home')} />
        <Item name='خروج از حساب' iconName='sign-out' onPress={Logout} tomato />
      </View>

    </>
  );

}

const styles = StyleSheet.create({
  Header: {
    width: '100%',
    height: 100,
    backgroundColor: purple,
    borderColor: 'grey',
    borderWidth: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row'
  }, drawerItemContainer: {
    paddingVertical: 10,
    marginHorizontal: 3,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    backgroundColor: lightGray,
  }, Container: {
    backgroundColor: lightGray,
    height: '100%',
    borderWidth: 0.5,
    borderColor: purple
  }, HeaderTitle: {
    color: lightGray
  }, drawerItemIcon: {
    color: 'black'
  }, drawerItemIconTomato: {
    color: 'tomato'
  }, drawerItemText: {
    color: 'black'
  }, drawerItemTextTomato: {
    color: 'tomato'

  }
});
const mapStateToProps = state => ({
  user: state.loginReducer.user
});
const mapDispatchToProps = dispatch => ({
  userLogout: data => userLogout({ data, dispatch }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoustomDrawer);
