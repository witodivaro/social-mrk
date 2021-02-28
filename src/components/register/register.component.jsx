import './register.styles.scss';
import React, { useEffect, useMemo, useState } from 'react';

import Card from '../card/card.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import useInputs from '../../hooks/use-inputs';
import { signUpStart } from '../../redux/user/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthErrors,
  selectAuthState,
} from '../../redux/user/user.selectors';
import { ERROR_CONFIG, ERROR_TYPES } from '../../config/errors';
import AUTH_STATES from '../../config/auth-states';
import { FaSpinner } from 'react-icons/fa';

const Register = () => {
  const dispatch = useDispatch();
  const authErrors = useSelector(selectAuthErrors);
  const authState = useSelector(selectAuthState);

  const [inputs, onInputChange] = useInputs({
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
    registerPasswordConfirm: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    authErrors.forEach((error) => {
      switch (error.type) {
        case ERROR_TYPES.registerEmail:
          setErrors((errors) => ({
            ...errors,
            email: error.text,
          }));
          break;
        case ERROR_TYPES.registerUsername:
          setErrors((errors) => ({
            ...errors,
            username: error.text,
          }));
          break;
      }
    });
  }, [authErrors]);

  const registerHandler = async (e) => {
    e.preventDefault();
    setErrors({
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });

    if (inputs.registerPassword !== inputs.registerPasswordConfirm) {
      setErrors({
        ...errors,
        passwordConfirm: ERROR_CONFIG.REGISTER.passwordsDontMatch.text,
      });
      return;
    }

    dispatch(
      signUpStart({
        username: inputs.registerUsername,
        email: inputs.registerEmail,
        password: inputs.registerPassword,
      })
    );
  };

  const renderRegisterForm = (disabled = false) => (
    <form className="register__form" onSubmit={registerHandler}>
      <h3 className="register__header">Станьте социалом прямо сейчас!</h3>
      <FormInput
        label="Логин"
        name="registerUsername"
        type="text"
        value={inputs.registerUsername}
        error={errors.username}
        onChange={onInputChange}
        disabled={disabled}
        required
      />
      <FormInput
        label="Почта"
        name="registerEmail"
        type="email"
        value={inputs.registerEmail}
        error={errors.email}
        onChange={onInputChange}
        disabled={disabled}
        required
      />
      <FormInput
        label="Пароль"
        name="registerPassword"
        type="password"
        value={inputs.registerPassword}
        error={errors.password}
        onChange={onInputChange}
        disabled={disabled}
        required
      />
      <FormInput
        label="Подтвердите пароль"
        name="registerPasswordConfirm"
        type="password"
        value={inputs.registerPasswordConfirm}
        error={errors.passwordConfirm}
        onChange={onInputChange}
        disabled={disabled}
        required
      />
      <CustomButton inverted disabled={disabled} type="submit">
        Зарегистрироваться
      </CustomButton>
    </form>
  );

  const renderContent = () => {
    switch (authState) {
      case AUTH_STATES.SIGNING_UP:
        return (
          <>
            {renderRegisterForm(true)}
            <FaSpinner className="register__spinner" size={50} />
          </>
        );
      default:
        return renderRegisterForm();
    }
  };

  return <Card className="register">{renderContent()}</Card>;
};

export default Register;
