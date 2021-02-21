import './custom-button.styles.scss';

const CustomButton = ({ className, children, ...props }) => {
  return (
    <button className={`custom-button ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;
