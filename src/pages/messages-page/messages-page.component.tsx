import './messages-page.styles.scss';
import { Switch, Route } from 'react-router';
import DialogueList from '../../components/Messages/dialogue-list/dialogue-list.component';
import Dialogue from '../../components/Messages/dialogue/dialogue.component';

const MessagesPage = () => {
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
