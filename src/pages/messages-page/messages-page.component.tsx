import './messages-page.styles.scss';
import { Switch, Route, RouteComponentProps } from 'react-router';
import DialogueList from '../../components/Messages/dialogue-list/dialogue-list.component';
import Dialogue from '../../components/Messages/dialogue/dialogue.component';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { fetchLastMessagesStart } from '../../redux/messages/messages.actions';

const MessagesPage = (props: RouteComponentProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLastMessagesStart());
  }, [dispatch]);

  return (
    <div className="messages-page">
      <Switch>
        <Route exact path="/messages" component={DialogueList} />
        <Route exact path="/messages/:userId" component={Dialogue} />
      </Switch>
    </div>
  );
};

export default MessagesPage;
