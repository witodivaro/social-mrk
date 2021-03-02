import "./home-page.styles.scss";

import SignUp from "../../components/sign-up/sign-up.component";
import SignIn from "../../components/sign-in/sign-in.component";

const HomePage = () => {
  return (
    <div className="home">
      <div className="home__auth">
        <SignIn />
        <SignUp />
      </div>
    </div>
  );
};

export default HomePage;
