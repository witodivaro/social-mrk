import './custom-button.styles.scss';

interface CustomButtonProps {
  className?: string;
  children?: JSX.Element | string;
  inverted?: boolean;
  [key: string]: any;
}

const CustomButton = ({
  className,
  children,
  inverted,
  ...props
}: CustomButtonProps) => {
  return (
    <button
      className={`custom-button ${className || ''} ${
        inverted ? 'inverted' : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
