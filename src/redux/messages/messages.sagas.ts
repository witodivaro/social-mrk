import { all, put, takeLatest, StrictEffect } from '@redux-saga/core/effects';
import { MessagesActionTypes } from './messages.types';
import socialMrkAPI from '../../apis/social-mrk.api';
import { AxiosPromise, AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import * as MessagesActions from './messages.actions';
import { getHandledNetworkErrors } from '../user/user.sagas';

function* fetchLastMessages(): Generator<
  AxiosPromise | StrictEffect,
  void,
  AxiosResponse<{ all_messages: [] }>
> {
  try {
    const response = yield socialMrkAPI.getAllMessages();
    yield put(
      MessagesActions.fetchLastMessagesSuccess(response.data.all_messages)
    );
  } catch (e) {
    const handledNetworkErrors = getHandledNetworkErrors(e);
    yield put(MessagesActions.fetchLastMessagesFailure(handledNetworkErrors));
  }
}

function* sendMessage({
  payload,
}: AnyAction): Generator<AxiosPromise | StrictEffect, void, AxiosResponse> {
  const { id, message } = payload;
  try {
    const response = yield socialMrkAPI.sendMessage(id, message);
    console.log(response);
  } catch (e) {}
}

function* onFetchLastMessagesStart() {
  yield takeLatest(
    MessagesActionTypes.FETCH_LAST_MESSAGES_START,
    fetchLastMessages
  );
}

function* onSendMessageStart() {
  yield takeLatest(MessagesActionTypes.SEND_MESSAGE_START, sendMessage);
}

export default function* messagesSagas() {
  yield all([onFetchLastMessagesStart(), onSendMessageStart()]);
}
