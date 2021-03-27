import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import userPageReducer from './user-page/user-page.reducer';
import socialsReducer from './socials/socials.reducer';
import messagesReducer from './messages/messages.reducer';

export default combineReducers({
  user: userReducer,
  userPage: userPageReducer,
  socials: socialsReducer,
  messages: messagesReducer,
});
