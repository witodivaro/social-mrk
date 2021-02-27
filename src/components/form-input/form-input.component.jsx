import { useMemo, useRef } from 'react';
import './form-input.styles.scss';

const FormInput = ({ name, label, value, error, ...props }) => {
  const labelRef = useRef();

  const renderedError = useMemo(
    () => (error ? <p className="error">{error}</p> : null),
    [error]
  );

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
      {renderedError}
    </div>
  );
};

export default FormInput;
