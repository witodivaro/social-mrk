import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import userPageReducer from './user-page/user-page.reducer';

export default combineReducers({
  user: userReducer,
  userPage: userPageReducer,
});
