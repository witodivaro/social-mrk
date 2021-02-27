import './register.styles.scss';
import React from 'react';

import register from '../../apis/register';
import Card from '../card/card.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import useInputs from '../../hooks/use-inputs';

const Register = () => {
  const [inputs, onInputChange] = useInputs({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const registerHandler = (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.passwordConfirm) {
      alert('Passwords dont match');
      return;
    }

    register({
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
    }).then((res) => console.log(res));
  };

  return (
    <Card className="register">
      <form className="register__form" onSubmit={registerHandler}>
        <h3 className="register__header">Станьте социалом прямо сейчас!</h3>
        <FormInput
          label="Логин"
          name="username"
          type="text"
          value={inputs.username}
          onChange={onInputChange}
          required
        />
        <FormInput
          label="Почта"
          name="email"
          type="email"
          value={inputs.email}
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
        <FormInput
          label="Подтвердите пароль"
          name="passwordConfirm"
          type="password"
          value={inputs.passwordConfirm}
          onChange={onInputChange}
          required
        />
        <CustomButton type="submit">Зарегистрироваться</CustomButton>
      </form>
    </Card>
  );
};

export default Register;
