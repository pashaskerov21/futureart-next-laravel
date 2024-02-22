import {combineReducers} from '@reduxjs/toolkit';
import LocaleReducer from './reducer/LocaleReducer';

const RootReducer = combineReducers({
    localeState: LocaleReducer,
});

export default RootReducer;
