/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import iconArOn from "assets/images/arOn.png";
import iconArOff from "assets/images/arOff.png";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuFlutuante from "layouts/commands/forms/Menu";

import PropTypes from "prop-types";

export default function data(comandos, handleBotaoDelete) {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  // const handle = (id) => {
  //   handleBotaoDelete(id);
  // };

  return {
    columns: [
      { Header: "Comandos", accessor: "project", width: "30%", align: "center" },
      { Header: "Editar Comando", accessor: "action", align: "center" },
    ],
    rows: comandos.map((comando, index) => ({
      project: <Project image={LogoAsana} name={comando.nome} />,
      action: (
        <MenuFlutuante index={index} deleteButton={handleBotaoDelete} />
        // <IconButton onClick={(e) => abrirMenu(e, index)}>
        //   <MoreVertIcon />
        // </IconButton>
      ),
    })),
  };
}

// Typechecking props for the DefaultInfoCard
data.propTypes = {
  defaultValue: {
    comandos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
      })
    ),
  },
  comandos: PropTypes.array.isRequired,
  handleBotao: PropTypes.func.isRequired, // obrigatório e precisa ser função
};
