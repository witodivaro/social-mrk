import { useRef } from 'react';
import './form-input.styles.scss';

const FormInput = ({ name, label, value, ...props }) => {
  const labelRef = useRef();

  return (
    <div className="form-input">
      <input id={name} name={name} {...props} />
      <label
        htmlFor={name}
        ref={labelRef}
        className={`label ${value ? 'shrink' : ''}`}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
