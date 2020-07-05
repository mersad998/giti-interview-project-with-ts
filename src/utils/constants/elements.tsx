import {Text, ViewStyle, StyleProp} from 'react-native';
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
import {white, purple, lightGray} from 'utils/constants/colors';

// ---------------------------------------------------------------------------
// این کامئوننت همان تکست را با استایل ایران سنس برمیگرداند

export const CoustomTextComponent = (props: any) => (
  <Text
    style={[CoustomTextComponentStyles.text, {...props.style}]}
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
interface MySpinner {
  color: string;
  style?: StyleProp<ViewStyle>;
}
export const MySpinner = (props: MySpinner) => (
  <Spinner
    style={[MySpinnerStyle.Spinner, props.style]}
    color={props.color ? props.color : purple}
  />
);

const MySpinnerStyle = StyleSheet.create({
  Spinner: {alignSelf: 'center'},
});

// ---------------------------------------------------------------------------
// کامپوننت دکمه
interface CoustomButtonComponentInterface {
  style?: StyleProp<ViewStyle>;
  onPress(): void;
  name: string;
  isLoading?: boolean;
  disabled?: boolean;
  inCart?: boolean;
}
export const CoustomButtonComponent = (
  props: CoustomButtonComponentInterface,
) => (
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
  cartSpinner: {height: '100%'},
});

// ---------------------------------------------------------------------------
// هدر سفارشی استفاده شده در برنامه
interface MyHeaderInterface {
  onBackPress?(): void;
  onPlusPress?(): void;
  onHamburgerPress?(): void;
  onCheckPress: any;
  Title: string;
}
export const MyHeader = (props: MyHeaderInterface) => (
  <>
    <Header style={HeaderStyels.Container}>
      {props.onBackPress ? (
        <TouchableOpacity
          style={HeaderStyels.Icons}
          onPress={props.onBackPress}>
          <Icon
            type="FontAwesome"
            name="arrow-left"
            style={HeaderStyels.Icon}
          />
        </TouchableOpacity>
      ) : null}
      <Text style={HeaderStyels.Text}>{props.Title}</Text>
      {props.onPlusPress ? (
        <TouchableOpacity
          style={HeaderStyels.Icons}
          onPress={props.onPlusPress}>
          <Icon type="FontAwesome" name="plus" style={HeaderStyels.Icon} />
        </TouchableOpacity>
      ) : null}
      {props.onHamburgerPress ? (
        <TouchableOpacity
          style={HeaderStyels.Icons}
          onPress={props.onHamburgerPress}>
          <Icon style={HeaderStyels.Icon} type="FontAwesome" name="bars" />
        </TouchableOpacity>
      ) : null}
      {props.onCheckPress ? (
        <TouchableOpacity
          style={HeaderStyels.Icons}
          onPress={props.onCheckPress}>
          <Icon style={HeaderStyels.Icon} type="FontAwesome" name="check" />
        </TouchableOpacity>
      ) : null}
    </Header>
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
  Icon: {color: lightGray},
  IconCheck: {
    color: lightGray,
    fontSize: 22,
  },
});
