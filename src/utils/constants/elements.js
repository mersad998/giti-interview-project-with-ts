import { Text } from 'react-native';
import React from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Spinner,
  Button,
  Header,
  Icon,
  View,
  Item,
  Input,
  Label,
} from 'native-base';
import { white, purple, lightGray } from 'utils/constants/colors';
import Dash from 'react-native-dash';

// ---------------------------------------------------------------------------
// این کامئوننت همان تکست را با استایل ایران سنس برمیگرداند

export const CoustomTextComponent = props => (
  <Text
    style={[CoustomTextComponentStyles.text, { ...props.style }]}
    onPress={props.onPress}>
    {props.children}
  </Text>
);

const CoustomTextComponentStyles = StyleSheet.create({
  text: {
    fontFamily: 'IRANSansMobile(FaNum)',
  },
});

// ---------------------------------------------------------------------------
// کتمپوننت اسپینر

export const MySpinner = props => (
  <Spinner
    style={[MySpinnerStyle.Spinner, props.style]}
    color={props.color ? props.color : purple}
  />
);

const MySpinnerStyle = StyleSheet.create({
  Spinner: { alignSelf: 'center' },
});

// ---------------------------------------------------------------------------
// کامپوننت دکمه

export const CoustomButtonComponent = props => (
  <Button
    style={[CoustomButtonComponentStyles.Button, props.style]}
    onPress={props.onPress}
    disabled={props.disabled}>
    {!props.isLoading ? (
      <CoustomTextComponent style={CoustomButtonComponentStyles.text}>
        {props.name}
      </CoustomTextComponent>
    ) : null}
    {props.isLoading && !props.inCart ? <MySpinner color={white} /> : null}
    {props.isLoading && props.inCart ? (
      <MySpinner
        color={white}
        style={CoustomButtonComponentStyles.cartSpinner}
      />
    ) : null}
  </Button>
);

const CoustomButtonComponentStyles = StyleSheet.create({
  Button: {
    borderWidth: 0.5,
    borderColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: undefined,
    paddingVertical: 5,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 15,
    margin: 2,
  },
  text: {
    color: white,
  },
  cartSpinner: { height: '100%' },
});

// ---------------------------------------------------------------------------
// هدر سفارشی استفاده شده در برنامه
export const MyHeader = props => (
  <>
    <Header style={HeaderStyels.Container}>
      {props.onBackPress ? (
        <TouchableOpacity style={HeaderStyels.Icons} onPress={props.onBackPress}>
          <Icon type="FontAwesome" name="arrow-left" style={HeaderStyels.Icon} />
        </TouchableOpacity>
      ) : null}
      <Text style={HeaderStyels.Text}>{props.Title}</Text>
      {props.onPlusPress ? (
        <TouchableOpacity style={HeaderStyels.Icons} onPress={props.onPlusPress}>
          <Icon type="FontAwesome" name="plus" style={HeaderStyels.Icon} />
        </TouchableOpacity>
      ) : null}
      {props.onHamburgerPress ? (
        <TouchableOpacity
          style={HeaderStyels.Icons}
          onPress={props.onHamburgerPress}>
          <Icon style={HeaderStyels.Icon} type="FontAwesome" name="bars" />
        </TouchableOpacity>) : null}
      {props.onCheckPress ? (
        <TouchableOpacity
          style={HeaderStyels.Icons}
          onPress={props.onCheckPress}>
          <Icon style={HeaderStyels.Icon} type="FontAwesome" name="check" />
        </TouchableOpacity>) : null}
    </Header>
    {/* <Dash style={{width:'100%', height:1}} dashGap={10} dashLength={10} dashColor={purple}/> */}
  </>
);

const HeaderStyels = StyleSheet.create({
  Container: {
    backgroundColor: purple,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  Icons: {
    flex: 1,
    alignItems: 'center',
  },
  IconsStyle: {
    color: lightGray,
  },
  Text: {
    flex: 5,
    fontSize: 17,
    textAlign: 'center',
    color: lightGray,
    fontFamily: 'IRANSansMobile(FaNum)',
  },
  NotifIndex: backgroundColor => {
    return {
      width: 15,
      fontSize: 18,
      height: 25,
      color: 'black',
      backgroundColor: backgroundColor,
      borderRadius: 10,
      alignItems: 'center',
      textAlign: 'center',
      marginTop: -44,
      marginRight: -16,
      fontFamily: 'IRANSansMobile(FaNum)',
    };
  },
  Icon: { color: lightGray },
  IconCheck: {
    color: lightGray,
    fontSize: 22,
  },
});

// ---------------------------------------------------------------------------
//  اینپوت های سفارشی برنامه
export const IconInput = React.forwardRef(
  (props, ref, backgroundColor = white, width = '90%') => (
    <View
      style={[
        IconInputstyels.Container({ backgroundColor, width }),
        { ...props.style },
      ]}>
      <Item style={IconInputstyels.Item}>
        <Input
          style={IconInputstyels.Input({ backgroundColor, width })}
          ref={ref}
          onFocus={props.onFocus}
          value={props.value}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          onSubmitEditing={props.onSubmitEditing}
          returnKeyType={props.returnKeyType}
          blurOnSubmit={props.blurOnSubmit}
          placeholderTextColor={'gray'}
          maxLength={props.maxLength}
        />
        {props.LabelName ? (
          <Label style={IconInputstyels.Label}>{props.LabelName}</Label>
        ) : null}
        {props.IconName ? (
          <Icon
            style={IconInputstyels.Icon}
            type={props.type ? props.type : 'FontAwesome'}
            name={props.IconName}
          />
        ) : null}
      </Item>
    </View>
  ),
);

const IconInputstyels = StyleSheet.create({
  Container: ({ backgroundColor, width }) => {
    return {
      width: width,
      flexDirection: 'row-reverse',
      alignItems: 'flex-end',
      // alignSelf: "center",
      marginTop: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: lightGray,
      backgroundColor: backgroundColor,
    };
  },
  Item: {
    flex: 5,
    // marginRight:12
  },
  Label: {
    alignSelf: 'flex-end',
    color: 'gray',
    fontSize: 12,
    fontFamily: 'IRANSansMobile(FaNum)',
  },
  Icon: {
    fontSize: 22,
    color: 'gray',
  },
  Input: ({ backgroundColor, width }) => {
    return {
      textAlign: 'right',
      fontSize: 14,
      marginRight: 10,
      width: width,
      backgroundColor: backgroundColor,
      fontFamily: 'IRANSansMobile(FaNum)',
    };
  },
});
