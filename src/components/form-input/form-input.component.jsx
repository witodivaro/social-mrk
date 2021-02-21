import { useRef, useState } from 'react';
import './form-input.styles.scss';

const FormInput = ({ label, value, ...props }) => {
  const labelRef = useRef();

  return (
    <div className="form-input">
      <input id={label} {...props} />
      <label
        htmlFor={label}
        ref={labelRef}
        className={`label ${value ? 'shrink' : ''}`}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
