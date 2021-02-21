import { useState } from 'react';

const useInputs = (defaultInputs) => {
  const [inputs, setInputs] = useState(defaultInputs);

  const inputChangeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return [inputs, inputChangeHandler];
};

export default useInputs;
