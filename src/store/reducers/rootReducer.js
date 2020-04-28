import authReducer from './authReducer';
import listReducer from './listReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    list: listReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer