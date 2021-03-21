import './messages-page.styles.scss';
import React from 'react';
import UserActionsAPI from '../../apis/user-actions/api';
import { Switch, Route } from 'react-router';
import DialogueList from '../../components/Messages/dialogue-list/dialogue-list.component';
import Dialogue from '../../components/Messages/dialogue/dialogue.component';

const MessagesPage = () => {
  const sendMessageHandler = (e) => {
    e.preventDefault();

    UserActionsAPI.messages({
      id: 15,
      message: 'asd',
    });
  };

  return (
    <div className="messages-page">
      <Switch>
        <Route exact path="/messages" component={DialogueList} />
        <Route exact path="/messages/:userId" component={Dialogue} />
      </Switch>
      <button onClick={sendMessageHandler}>asd</button>
    </div>
  );
};

export default MessagesPage;
