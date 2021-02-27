import './login.styles.scss';
import React, { useMemo, useState } from 'react';

import Card from '../card/card.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import login from '../../apis/login';
import useInputs from '../../hooks/use-inputs';

const Login = () => {
  const [inputs, onInputChange] = useInputs({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login({
        username: inputs.username,
        password: inputs.password,
      });
    } catch (error) {
      switch (error.response.status) {
        case 500:
          setError(
            'Возникли проблемы с сетью, проверьте подключение и попробуйте еще раз.'
          );
          break;
        case 400:
          setError('Логин или пароль введён неверно. Попробуйте ещё раз.');
      }
    }
  };

  const renderedError = useMemo(
    () => (error ? <p className="login__error">{error}</p> : null),
    [error]
  );

  return (
    <Card className="login">
      <form className="login__form" onSubmit={loginHandler}>
        <h3 className="login__header">Вход</h3>
        {renderedError}
        <FormInput
          label="Логин"
          name="username"
          type="text"
          value={inputs.username}
          onChange={onInputChange}
          required
        />
        <FormInput
          label="Пароль"
          name="password"
          type="password"
          value={inputs.password}
          onChange={onInputChange}
          required
        />

        <CustomButton type="submit">Войти</CustomButton>
      </form>
    </Card>
  );
};

export default Login;
