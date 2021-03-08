export const ERROR_CONFIG = {
  SIGN_UP: {
    USERNAME_TAKEN: {
      text: 'Данный логин уже занят.',
      type: 'SIGN_UP/USERNAME_TAKEN',
    },
    EMAIL_TAKEN: {
      text: 'Эта почта уже занята.',
      type: 'SIGN_UP/EMAIL_TAKEN',
    },
    INVALID_PASSWORD: {
      text: 'Введите корректный пароль.',
      type: 'SIGN_UP/INVALID_PASSWORD',
    },
    PASSWORDS_DONT_MATCH: {
      text: 'Пароли не совпадают.',
      type: 'SIGN_UP/PASSWORDS_DONT_MATCH',
    },
  },
  SIGN_IN: {
    WRONG_CREDENTIALS: {
      text: 'Неправильный логин или пароль.',
      type: 'SIGN_IN/WRONG_CREDENTITLAS',
    },
  },
  NETWORK: {
    SERVER_FAIL: {
      text: 'Возникли проблемы с сервером. Попробуйте ещё раз попозже.',
      type: 'NETOWRK/SERVER_FAIL',
    },
    CLIENT_FAIL: {
      text: 'Проверьте подключение к сети и попробуйте ещё раз.',
      type: 'NETWORK/CLIENT_FAIL',
    },
  },
  GET_USER: {
    PAGE_NOT_FOUND: {
      text:
        'Страница не найдена. Возможно, её не существует или она была удалена.',
      type: 'GET_USER/PAGE_NOT_FOUND',
    },
  },
};
