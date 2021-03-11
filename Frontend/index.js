/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/container/App';
import {name as appName} from './app.json';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
AppRegistry.registerComponent(appName, () => App);