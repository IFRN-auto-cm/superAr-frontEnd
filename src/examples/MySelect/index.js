import PropTypes from "prop-types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MDBox from "components/MDBox";
import { useState } from "react";

function MySelect({ label, items, required, setValue }) {
  const [data, setData] = useState("");

  const handleChange = (event) => {
    setData(event.target.value);
    setValue(event.target.value);
  };

  return (
    <MDBox>
      <FormControl fullWidth required={required}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data}
          label={label}
          onChange={handleChange}
          fullWidth
          sx={{
            height: 48,
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              height: "100%",
            },
          }}
        >
          {items.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.nome}
            </MenuItem>
          ))}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </MDBox>
  );
}

MySelect.defaultProps = {
  label: "",
  required: false,
};

// Typechecking props for the DefaultInfoCard
MySelect.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  items: PropTypes.arrayOf(),
  setValue: PropTypes.func,
};

export default MySelect;
