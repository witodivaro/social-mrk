import './sign-in.styles.scss';
import React, { useMemo, useState, FormEvent } from 'react';

import Card from '../card/card.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import useInputs from '../../hooks/use-inputs';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSignInErrors,
  selectSignInState,
} from '../../redux/user/user.selectors';
import { signInStart } from '../../redux/user/user.actions';
import { FaSpinner } from 'react-icons/fa';
import { FETCH_STATES } from '../../config/fetch-states';
import { HandledSignInErrors } from '../../types/HandledErrors';

const SignIn = () => {
  const dispatch = useDispatch();
  const [inputs, onInputChange] = useInputs({
    username: '',
    password: '',
  });
  const signInState = useSelector(selectSignInState);
  const signInErrors: HandledSignInErrors = useSelector(selectSignInErrors);

  const [localErrors, setLocalErrors] = useState([]);

  const loginHandler = (e: FormEvent) => {
    e.preventDefault();
    setLocalErrors([]);

    dispatch(
      signInStart({ username: inputs.username, password: inputs.password })
    );
  };

  const renderedError = useMemo(() => {
    let allErrors: string[] = [];
    if (localErrors) {
      localErrors.forEach((error) => allErrors.push(error));
    }

    if (signInErrors) {
      Object.values(signInErrors).forEach((errors) => {
        if (errors.length > 0) {
          errors.forEach((error: string) => allErrors.push(error));
        }
      });
    }

    return (
      <p className="login__error">
        {allErrors.map((error) => (
          <React.Fragment key={`ERROR ${error}`}>{error}</React.Fragment>
        ))}
      </p>
    );
  }, [localErrors, signInErrors]);

  const renderSignInForm = (disabled = false) => {
    return (
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
  };

  const renderContent = () => {
    switch (signInState) {
      case FETCH_STATES.SUCCESS:
        return (
          <p className="login__success">Вы успешно вошли в свой аккаунт!</p>
        );

      case FETCH_STATES.FETCHING:
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

export default SignIn;
