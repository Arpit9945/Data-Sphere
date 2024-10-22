import { combineReducers } from 'redux';
import LoginData from './reducer';
import { ShowNotification } from './reducer'; 

export default combineReducers({
    LoginData,
    ShowNotification
});
