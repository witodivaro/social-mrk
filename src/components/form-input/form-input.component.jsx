import { useMemo, useRef } from 'react';
import './form-input.styles.scss';

const FormInput = ({
  className,
  name,
  label,
  value,
  errors,
  disabled,
  ...props
}) => {
  const labelRef = useRef();

  const renderedError = useMemo(
    () =>
      errors?.length > 0 ? (
        <p className="error">{errors.map((error) => error)}</p>
      ) : null,
    [errors]
  );

  return (
    <div className={`form-input ${disabled ? 'disabled' : ''} ${className}`}>
      <input id={name} name={name} disabled={disabled} {...props} />
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
