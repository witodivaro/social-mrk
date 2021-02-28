export const ERROR_TYPES = {
  registerUsername: 'register-username',
  registerEmail: 'register-email',
  registerInvalidPassword: 'register-invalid-password',
  registerPasswordConfirm: 'register-password-confirm',
  loginWrongCredentials: 'login-wrong-credentials',
  networkServerFail: 'network-server-fail',
  networkClientFail: 'network-client-fail',
};

export const ERROR_CONFIG = {
  REGISTER: {
    usernameTaken: {
      text: 'Данный логин уже занят.',
      type: ERROR_TYPES.registerUsername,
    },
    emailTaken: {
      text: 'Эта почта уже занята.',
      type: ERROR_TYPES.registerEmail,
    },
    invalidPassword: {
      text: 'Введите корректный пароль.',
      type: ERROR_TYPES.registerInvalidPassword,
    },
    passwordsDontMatch: {
      text: 'Пароли не совпадают.',
      type: ERROR_TYPES.registerPasswordConfirm,
    },
  },
  LOGIN: {
    wrongCredentials: {
      text: 'Неправильный логин или пароль.',
      type: ERROR_TYPES.loginWrongCredentials,
    },
  },
  NETWORK: {
    SERVER_FAIL: {
      text: 'Возникли проблемы с сервером. Попробуйте ещё раз попозже.',
      type: ERROR_TYPES.networkServerFail,
    },
    CLIENT_FAIL: {
      text: 'Проверьте подключение к сети и попробуйте ещё раз.',
      type: ERROR_TYPES.networkClientFail,
    },
  },
};
