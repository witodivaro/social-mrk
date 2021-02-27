import './register.styles.scss';
import React, { useState } from 'react';

import register from '../../apis/register';
import Card from '../card/card.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import useInputs from '../../hooks/use-inputs';

const ErrorConfig = {
  usernameExists: 'Этот логин занят.',
  emailExists: 'Эта почта уже используется',
  incorrectPassword: 'Пароль может содержать только латинские буквы и цифры.',
  passwordDontMatch: 'Пароли не совпадают',
};

const Register = () => {
  const [inputs, onInputChange] = useInputs({
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
    registerPasswordConfirm: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    passwordConfirm: '',
  });

  const registerHandler = async (e) => {
    e.preventDefault();
    setErrors({
      username: '',
      password: '',
      email: '',
      passwordConfirm: '',
      external: '',
    });

    if (inputs.registerPassword !== inputs.registerPasswordConfirm) {
      setErrors({
        ...errors,
        passwordConfirm: ErrorConfig.passwordDontMatch,
      });
      return;
    }

    try {
      const response = await register({
        username: inputs.registerUsername,
        email: inputs.registerEmail,
        password: inputs.registerPassword,
      });

      if (response.data.error) {
        for (const errorName of Object.keys(response.data.error)) {
          let errorText = '';
          switch (errorName) {
            case 'username':
              errorText = ErrorConfig.usernameExists;
              break;
            case 'email':
              errorText = ErrorConfig.emailExists;
              break;
            case 'password':
              errorText = ErrorConfig.incorrectPassword;
              break;
            default:
              break;
          }
          setErrors((errors) => ({
            ...errors,
            [errorName]: errorText,
          }));
        }
      }
    } catch (error) {
      setErrors((errors) => ({
        ...errors,
        external: error.message,
      }));
    }
  };

  return (
    <Card className="register">
      <form className="register__form" onSubmit={registerHandler}>
        <h3 className="register__header">Станьте социалом прямо сейчас!</h3>
        <FormInput
          label="Логин"
          name="registerUsername"
          type="text"
          value={inputs.registerUsername}
          error={errors.username}
          onChange={onInputChange}
          required
        />
        <FormInput
          label="Почта"
          name="registerEmail"
          type="email"
          value={inputs.registerEmail}
          error={errors.email}
          onChange={onInputChange}
          required
        />
        <FormInput
          label="Пароль"
          name="registerPassword"
          type="password"
          value={inputs.registerPassword}
          error={errors.password}
          onChange={onInputChange}
          required
        />
        <FormInput
          label="Подтвердите пароль"
          name="registerPasswordConfirm"
          type="password"
          value={inputs.registerPasswordConfirm}
          error={errors.passwordConfirm}
          onChange={onInputChange}
          required
        />
        {errors.external ? (
          <p className="register__error">{errors.external}</p>
        ) : null}
        <CustomButton type="submit">Зарегистрироваться</CustomButton>
      </form>
    </Card>
  );
};

export default Register;
