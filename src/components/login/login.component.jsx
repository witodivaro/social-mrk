import './login.styles.scss';
import React, { useEffect, useMemo, useState } from 'react';

import Card from '../card/card.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import useInputs from '../../hooks/use-inputs';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthErrors } from '../../redux/user/user.selectors';
import { ERROR_CONFIG } from '../../config/errors';
import { signInStart } from '../../redux/user/user.actions';

const Login = () => {
  const dispatch = useDispatch();
  const [inputs, onInputChange] = useInputs({
    username: '',
    password: '',
  });

  const authErrors = useSelector(selectAuthErrors);

  const [error, setError] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    setError('');

    dispatch(
      signInStart({ username: inputs.username, password: inputs.password })
    );
  };

  useEffect(() => {
    authErrors.forEach((error) => {
      switch (error.type) {
        case ERROR_CONFIG.LOGIN.wrongCredentials.type:
          setError(ERROR_CONFIG.LOGIN.wrongCredentials.text);
      }
    });
  }, [authErrors]);

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
