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
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WindIcon from "@mui/icons-material/WindPower";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SunHeat from "@mui/icons-material/Brightness5";
import DryIcon from "@mui/icons-material/WaterDrop";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuFlutuante from "layouts/commands/forms/Menu";

import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";

export default function data(comandos, handleBotaoDelete) {
  const Temperatura = ({ valor }) => {
    return (
      <MDBox display="flex" gap={2.1} lineHeight={1} textAlign="left">
        <ThermostatIcon />
        <MDTypography variant="caption">{valor}º</MDTypography>
      </MDBox>
    );
  };

  const Fan = ({ valor }) => {
    let fanText = "";

    if (valor == 0) {
      fanText = "Baixo";
    } else if (valor == 1) {
      fanText = "Médio";
    } else if (valor == 2) {
      fanText = "Alto";
    } else {
      fanText = "Desconhecido";
    }

    return (
      <Tooltip title="Ajuste de fan">
        <MDBox display="flex" gap={2.1} lineHeight={1} textAlign="left">
          <WindIcon />
          <MDTypography variant="caption">{fanText}</MDTypography>
        </MDBox>
      </Tooltip>
    );
  };

  const Mode = ({ conf }) => {
    if (conf == 0) {
      return (
        <MDBox display="flex" gap={2.1} lineHeight={1} textAlign="left">
          <AcUnitIcon />
          <MDTypography variant="caption">Gelar</MDTypography>
        </MDBox>
      );
    } else if (conf == 1) {
      return (
        <MDBox display="flex" gap={2.1} lineHeight={1} textAlign="left">
          <SunHeat />
          <MDTypography variant="caption">Esquentar</MDTypography>
        </MDBox>
      );
    } else if (conf == 2) {
      return (
        <MDBox display="flex" gap={2.1} lineHeight={1} textAlign="left">
          <DryIcon />
          <MDTypography variant="caption">Secar</MDTypography>
        </MDBox>
      );
    }

    return (
      <MDBox>
        <AcUnitIcon />
      </MDBox>
    );
  };

  // const handle = (id) => {
  //   handleBotaoDelete(id);
  // };

  return {
    columns: [
      { Header: "Comandos", accessor: "project", width: "30%", align: "center" },
      { Header: "temperatura", accessor: "temperatura", align: "left" },
      { Header: "velocidade ventilador", accessor: "fanVelocity", align: "left" },
      { Header: "Modo", accessor: "mode", align: "left" },
      { Header: "Editar Comando", accessor: "action", align: "center" },
    ],
    rows: comandos.map((comando, index) => ({
      project: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
            {comando.nome == "Desligar" ? comando.nome : "Ligar/Configurar"}
          </MDTypography>
        </MDBox>
      ),
      temperatura: comando.nome == "Desligar" ? "" : <Temperatura valor={comando.nome} />,
      fanVelocity: comando.nome == "Desligar" ? "" : <Fan valor={index % 3} />,
      mode: comando.nome == "Desligar" ? "" : <Mode conf={index % 3} />,
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
