import socialMrk from "./social-mrk";

const regEndpoint = "/user/reg/";

const signUp = ({ username, email, password }) => {
  return socialMrk.post(regEndpoint, {
    username,
    email,
    password
  });
};

export default signUp;
