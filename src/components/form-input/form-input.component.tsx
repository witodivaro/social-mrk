import { useMemo, useRef } from 'react';
import './form-input.styles.scss';

interface FormInputProps {
  className?: string;
  name: string;
  label?: string;
  errors?: string[];
  disabled?: boolean;
  [inputProp: string]: any;
}

const FormInput = ({
  className,
  name,
  label,
  value,
  errors,
  disabled,
  ...props
}: FormInputProps) => {
  const labelRef = useRef(null);

  const renderedError = useMemo(() => {
    if (!errors) return null;

    return errors.length > 0 ? (
      <p className="error">{errors.map((error) => error)}</p>
    ) : null;
  }, [errors]);

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
