import './sign-up.styles.scss';
import React, { useState } from 'react';

import Card from '../card/card.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import useInputs from '../../hooks/use-inputs';
import { signUpStart } from '../../redux/user/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSignUpErrors,
  selectSignUpState,
} from '../../redux/user/user.selectors';
import { ERROR_CONFIG } from '../../config/errors';
import { FaSpinner } from 'react-icons/fa';
import { SIGN_UP_STATES } from '../../config/user-states';

const SignUp = () => {
  const dispatch = useDispatch();
  const signUpErrors = useSelector(selectSignUpErrors);
  const signUpState = useSelector(selectSignUpState);

  const [inputs, onInputChange] = useInputs({
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
    registerPasswordConfirm: '',
  });

  const [localErrors, setLocalErrors] = useState({
    passwordConfirm: '',
  });

  const registerHandler = async (e) => {
    e.preventDefault();
    setLocalErrors({
      passwordConfirm: '',
    });

    if (inputs.registerPassword !== inputs.registerPasswordConfirm) {
      setLocalErrors({
        ...localErrors,
        passwordConfirm: [ERROR_CONFIG.SIGN_UP.PASSWORDS_DONT_MATCH.text],
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

  const renderedError =
    signUpErrors?.network.length > 0 ? (
      <p className="sign-up__error">{signUpErrors.network}</p>
    ) : null;

  const renderSignUpForm = (disabled = false) => (
    <form className="sign-up__form" onSubmit={registerHandler}>
      <h3 className="sign-up__header">Станьте социалом прямо сейчас!</h3>
      {renderedError}
      <FormInput
        label="Логин"
        name="registerUsername"
        type="text"
        value={inputs.registerUsername}
        errors={signUpErrors?.username}
        onChange={onInputChange}
        disabled={disabled}
        required
      />
      <FormInput
        label="Почта"
        name="registerEmail"
        type="email"
        value={inputs.registerEmail}
        errors={signUpErrors?.email}
        onChange={onInputChange}
        disabled={disabled}
        required
      />
      <FormInput
        label="Пароль"
        name="registerPassword"
        type="password"
        value={inputs.registerPassword}
        errors={signUpErrors?.password}
        onChange={onInputChange}
        disabled={disabled}
        required
      />
      <FormInput
        label="Подтвердите пароль"
        name="registerPasswordConfirm"
        type="password"
        value={inputs.registerPasswordConfirm}
        errors={localErrors?.passwordConfirm}
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
    switch (signUpState) {
      case SIGN_UP_STATES.SUCCESS:
        return (
          <p className="sign-up__success">Вы успешно зарегистрировались!</p>
        );

      case SIGN_UP_STATES.SIGNING:
        return (
          <>
            {renderSignUpForm(true)}
            <FaSpinner className="sign-up__spinner" size={50} />
          </>
        );
      default:
        return renderSignUpForm();
    }
  };

  return <Card className="sign-up">{renderContent()}</Card>;
};

export default SignUp;
