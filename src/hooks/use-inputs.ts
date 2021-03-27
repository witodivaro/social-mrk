import { useState } from 'react';

interface Inputs {
  [key: string]: any;
}

interface InputEvent {
  target: {
    value: string;
    name: string;
  };
}

const useInputs = (defaultInputs: Inputs) => {
  const [inputs, setInputs] = useState(defaultInputs);

  const inputChangeHandler = (e: InputEvent) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return [inputs, inputChangeHandler];
};

export default useInputs;
