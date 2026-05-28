import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function MenuFlutuante({ index, deleteButton, editButton }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const abrirMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const fecharMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={(e) => abrirMenu(e, index)}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={fecharMenu}>
        <MenuItem
          onClick={() => {
            editButton(index);
            fecharMenu();
          }}
        >
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            deleteButton(index);
            fecharMenu();
          }}
        >
          Excluir
        </MenuItem>
        <MenuItem onClick={fecharMenu}>Detalhes</MenuItem>
      </Menu>
    </>
  );
}

MenuFlutuante.propTypes = {
  index: PropTypes.number.isRequired,
  //   showForm: PropTypes.bool.isRequired, // obrigatório e precisa ser string
  deleteButton: PropTypes.func.isRequired, // obrigatório e precisa ser função
  editButton: PropTypes.func.isRequired, // obrigatório e precisa ser função
  // detailButton: PropTypes.func.isRequired, // obrigatório e precisa ser função
};

export default MenuFlutuante;
