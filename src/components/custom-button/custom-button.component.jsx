import './custom-button.styles.scss';

const CustomButton = ({ className, children, inverted, ...props }) => {
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
