import './home-page.styles.scss';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Card from '../../components/card/card.component';

import useInputs from '../../hooks/use-inputs';

const RegisterPage = () => {
  const [inputs, onInputChange] = useInputs({
    login: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const formSubmitHandler = (e) => {
    console.log('submit');
    e.preventDefault();
    alert(inputs.login);
  };

  return (
    <div className="home">
      <Card className="home__card">
        <form className="home__form register" onSubmit={formSubmitHandler}>
          <h3 className="register__header">Станьте социалом прямо сейчас!</h3>
          <FormInput
            label="Логин"
            name="login"
            type="text"
            value={inputs.login}
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
    </div>
  );
};

export default RegisterPage;
