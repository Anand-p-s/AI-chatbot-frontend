import { TextField } from "@mui/material";

type props = {
  name: string;
  type: string;
  label: string;
};

const CustomInput = (props: props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      InputProps={{ style: { width: "400px", borderRadius: 10, fontSize: 20, color: "white" } }}
      label={props.label}
      name={props.name}
      type={props.label}
    />
  );
};

export default CustomInput;
