import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import userPageReducer from './user-page/user-page.reducer';
import userInteractionsReducer from './user-interactions/user-interactions.reducer';

export default combineReducers({
  user: userReducer,
  userPage: userPageReducer,
  userInteractions: userInteractionsReducer,
});
