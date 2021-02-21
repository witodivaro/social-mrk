import './register-page.styles.scss';

import FormInput from '../../components/form-input/form-input.component';

const RegisterPage = () => {
  return (
    <div className="register">
      <form className="register__form form">
        <h3 className="form__header">Станьте социалом прямо сейчас!</h3>
        <FormInput label="username" />
        <FormInput label="Почта" />
        <FormInput label="Пароль" />
        <FormInput label="Подтвердите пароль" />
      </form>
    </div>
  );
};

export default RegisterPage;
