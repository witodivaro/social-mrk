import './login.styles.scss';
import React, { useEffect, useMemo, useState } from 'react';

import Card from '../card/card.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import useInputs from '../../hooks/use-inputs';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthErrors,
  selectSignInState,
} from '../../redux/user/user.selectors';
import { ERROR_CONFIG } from '../../config/errors';
import { signInStart } from '../../redux/user/user.actions';
import { SIGN_IN_STATES } from '../../config/auth-states';

import { FaSpinner } from 'react-icons/fa';

const Login = () => {
  const dispatch = useDispatch();
  const [inputs, onInputChange] = useInputs({
    username: '',
    password: '',
  });
  const signInState = useSelector(selectSignInState);

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
        case ERROR_CONFIG.NETWORK.SERVER_FAIL.type:
          setError(ERROR_CONFIG.NETWORK.SERVER_FAIL.text);
        case ERROR_CONFIG.NETWORK.CLIENT_FAIL.type:
          setError(ERROR_CONFIG.NETWORK.CLIENT_FAIL.text);
      }
    });
  }, [authErrors]);

  const renderedError = useMemo(
    () => (error ? <p className="login__error">{error}</p> : null),
    [error]
  );

  const renderSignInForm = (disabled = false) => (
    <form
      className={`login__form ${disabled ? 'disabled' : ''}`}
      onSubmit={loginHandler}
    >
      <h3 className="login__header">Вход</h3>
      {renderedError}
      <FormInput
        label="Логин"
        name="username"
        type="text"
        value={inputs.username}
        onChange={onInputChange}
        disabled={disabled}
        required
      />
      <FormInput
        label="Пароль"
        name="password"
        type="password"
        value={inputs.password}
        onChange={onInputChange}
        disabled={disabled}
        required
      />

      <CustomButton disabled={disabled} type="submit">
        Войти
      </CustomButton>
    </form>
  );

  const renderContent = () => {
    switch (signInState) {
      case SIGN_IN_STATES.SUCCESS:
        return (
          <p className="login__success">Вы успешно вошли в свой аккаунт!</p>
        );

      case SIGN_IN_STATES.SIGNING:
        return (
          <>
            {renderSignInForm(true)}
            <FaSpinner className="login__spinner" size={50} />
          </>
        );

      default:
        return renderSignInForm();
    }
  };

  return <Card className="login">{renderContent()}</Card>;
};

export default Login;
