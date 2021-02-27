import './register.styles.scss';
import React from 'react';

import register from '../../apis/register';
import Card from '../card/card.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import useInputs from '../../hooks/use-inputs';

const Register = () => {
  const [inputs, onInputChange] = useInputs({
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
    registerPasswordConfirm: '',
  });

  const registerHandler = async (e) => {
    e.preventDefault();

    if (inputs.registerPassword !== inputs.registerPasswordConfirm) {
      alert('Passwords dont match');
      return;
    }

    const response = await register({
      username: inputs.registerUsername,
      email: inputs.registerEmail,
      password: inputs.registerPassword,
    });

    console.log(response);
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
          onChange={onInputChange}
          required
        />
        <FormInput
          label="Почта"
          name="registerEmail"
          type="email"
          value={inputs.registerEmail}
          onChange={onInputChange}
          required
        />
        <FormInput
          label="Пароль"
          name="registerPassword"
          type="password"
          value={inputs.registerPassword}
          onChange={onInputChange}
          required
        />
        <FormInput
          label="Подтвердите пароль"
          name="registerPasswordConfirm"
          type="password"
          value={inputs.registerPasswordConfirm}
          onChange={onInputChange}
          required
        />
        <CustomButton type="submit">Зарегистрироваться</CustomButton>
      </form>
    </Card>
  );
};

export default Register;
