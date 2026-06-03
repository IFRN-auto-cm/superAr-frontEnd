import PropTypes from "prop-types";
import { IconButton, TextField, Stack } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";

function NumericField({ defaultValue = 0, setExtValue }) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e) => {
    setValue(Number(e.target.value));
    setExtValue(Number(e.target.value));
    console.log("Numeric Field:");
    console.log(e.target.value);
  };
  const handleClickMinus = () => {
    setValue((v) => {
      const r = Math.max(10, v - 1);
      setExtValue(r);
      return r;
    });
  };

  const handleClickPlus = () => {
    setValue((v) => {
      const r = Math.min(35, v + 1);
      setExtValue(r);
      return r;
    });
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        border: "1px solid #ccc",
        borderRadius: 1,
        width: 160,
      }}
    >
      <IconButton onClick={handleClickMinus}>
        <RemoveIcon />
      </IconButton>

      <TextField
        variant="standard"
        value={value + "º"}
        onChange={handleChange}
        inputProps={{
          style: {
            textAlign: "center",
          },
        }}
        sx={{
          width: 50,
          "& .MuiInput-underline:before": {
            borderBottom: "none",
          },
          "& .MuiInput-underline:after": {
            borderBottom: "none",
          },
        }}
      />

      <IconButton onClick={handleClickPlus}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
}

NumericField.defaultProps = {
  defaultValue: 0,
};

// Typechecking props for the DefaultInfoCard
NumericField.propTypes = {
  defaultValue: PropTypes.number,
  //   gif: PropTypes.string,
  //   showForm: PropTypes.bool.isRequired, // obrigatório e precisa ser string
  setExtValue: PropTypes.func.isRequired, // obrigatório e precisa ser função
};

export default NumericField;
