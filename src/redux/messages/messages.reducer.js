import MessageActionTypes from './messages.types';

const mockDialogues = {
  1: {
    image: null,
    username: 'Username',
    messages: [
      {
        from: 1,
        text: 'Все переплетено',
        date: new Date(),
      },
      {
        from: 1,
        text: 'Все переплетено 2',
        date: new Date(),
      },
      {
        from: 20,
        text: 'Я русский',
        date: new Date(),
      },
      {
        from: 20,
        text: 'Да да я',
        date: new Date(),
      },
      {
        from: 1,
        text: 'Да да ты',
        date: new Date(),
      },
    ],
  },
};

const initialState = {
  dialogues: mockDialogues,
};

const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default messagesReducer;
