import {combineReducers} from 'redux'

import notificationreducer from './notificationreducer';
import usersreducer from './usersreducer';
export default combineReducers({
    notificationreducer,
    usersreducer
})