import ButtonMui from "@mui/material/Button";

const Button = ({ icon, text, className }) => {
  return (
    <ButtonMui variant="contained" className={`bg-red-500 ${className}`}>
      {icon && icon}
      <p> {text}</p>
    </ButtonMui>
  );
};

export default Button;
