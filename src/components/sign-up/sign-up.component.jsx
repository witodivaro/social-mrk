import "./sign-up.styles.scss";
import React, { useEffect, useState } from "react";

import Card from "../card/card.component";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import useInputs from "../../hooks/use-inputs";
import { signUpStart } from "../../redux/user/user.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignUpErrors,
  selectSignUpState
} from "../../redux/user/user.selectors";
import { ERROR_CONFIG } from "../../config/errors";
import { SIGN_UP_STATES } from "../../config/auth-states";
import { FaSpinner } from "react-icons/fa";

const SignUp = () => {
  const dispatch = useDispatch();
  const signUpErrors = useSelector(selectSignUpErrors);
  const signUpState = useSelector(selectSignUpState);

  const [inputs, onInputChange] = useInputs({
    registerUsername: "",
    registerEmail: "",
    registerPassword: "",
    registerPasswordConfirm: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    network: ""
  });

  useEffect(() => {
    signUpErrors.forEach(error => {
      switch (error.type) {
        case ERROR_CONFIG.SIGN_UP.EMAIL_TAKEN.type:
          setErrors(errors => ({
            ...errors,
            email: ERROR_CONFIG.SIGN_UP.EMAIL_TAKEN.text
          }));
          break;
        case ERROR_CONFIG.SIGN_UP.USERNAME_TAKEN.type:
          setErrors(errors => ({
            ...errors,
            username: ERROR_CONFIG.SIGN_UP.USERNAME_TAKEN.text
          }));
          break;
        case ERROR_CONFIG.NETWORK.CLIENT_FAIL.type:
          setErrors(errors => ({
            ...errors,
            network: ERROR_CONFIG.NETWORK.CLIENT_FAIL.text
          }));
      }
    });
  }, [signUpErrors]);

  const registerHandler = async e => {
    e.preventDefault();
    setErrors({
      username: "",
      email: "",
      password: "",
      passwordConfirm: ""
    });

    if (inputs.registerPassword !== inputs.registerPasswordConfirm) {
      setErrors({
        ...errors,
        passwordConfirm: ERROR_CONFIG.SIGN_UP.PASSWORDS_DONT_MATCH.text
      });
      return;
    }

    dispatch(
      signUpStart({
        username: inputs.registerUsername,
        email: inputs.registerEmail,
        password: inputs.registerPassword
      })
    );
  };

  const renderedError = errors.network ? (
    <p className="sign-up__error">{errors.network}</p>
  ) : null;

  const renderRegisterForm = (disabled = false) => (
    <form className="sign-up__form" onSubmit={registerHandler}>
      <h3 className="sign-up__header">Станьте социалом прямо сейчас!</h3>
      {renderedError}
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
    switch (signUpState) {
      case SIGN_UP_STATES.SUCCESS:
        return (
          <p className="sign-up__success">Вы успешно зарегистрировались!</p>
        );

      case SIGN_UP_STATES.SIGNING:
        return (
          <>
            {renderRegisterForm(true)}
            <FaSpinner className="sign-up__spinner" size={50} />
          </>
        );
      default:
        return renderRegisterForm();
    }
  };

  return <Card className="sign-up">{renderContent()}</Card>;
};

export default SignUp;