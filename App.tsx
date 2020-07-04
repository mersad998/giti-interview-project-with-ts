/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Routs from './Routs';
import {StatusBar} from 'react-native';
const {Provider} = require('react-redux');
import configureStore from './__redux/store/index';
const store = configureStore();

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <Provider store={store}>
      <>
        <StatusBar backgroundColor="#5c0731" />
        <Routs />
      </>
    </Provider>
  );
};

export default App;
