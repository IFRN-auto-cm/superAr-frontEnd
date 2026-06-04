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
import Tooltip from "@mui/material/Tooltip";

// Images
import LogoAr from "assets/images/logos/arcondicionado.png";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import iconArOn from "assets/images/arOn.png";
import iconArOff from "assets/images/arOff.png";
import iconArLock from "assets/images/arlock.png";
import MenuFlutuante from "examples/MenuFlutuante/Menu";
import IconButton from "@mui/material/IconButton";

export default function data(aresCondicionados, deleteButton, editButton, triggerButton) {
  const MarcaModelo = ({ image, sala, modelo }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={sala} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{modelo}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Temperatura = ({ setpoint, medicao }) => (
    <MDBox>
      <MDBox display="flex" gap={0.5} lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          Referência:
        </MDTypography>
        <MDTypography variant="caption">{setpoint}º</MDTypography>
      </MDBox>
      <MDBox display="flex" gap={2.1} lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          Medição:
        </MDTypography>
        <MDTypography variant="caption">{medicao}º</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );
  console.log(aresCondicionados);
  return {
    columns: [
      { Header: "Sala", accessor: "project", width: "30%", align: "left" },
      { Header: "Temperatura", accessor: "budget", align: "left" },
      { Header: "Marca e modelo", accessor: "completion", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Menu", accessor: "action", align: "center" },
    ],

    rows: aresCondicionados.map((mm, index) => ({
      // project: <Project image={LogoAr} name={mm.sala} />,
      // project: <MarcaModelo image={LogoAr} name={mm.sala} modelo={mm.marca} />,
      project: <Author image={LogoAr} name={mm.codigo} email={mm.sala} />,
      budget: <Temperatura setpoint={mm.temperatura.referencia} medicao={mm.temperatura.medicao} />,
      completion: (
        // <Progress color="info" value={mm.temperatura.medicao - mm.temperatura.referencia} />
        // <Author name={mm.marca} email={mm.modelo} />
        <Job title={mm.marca} description={mm.modelo} />
      ),
      status: !mm.atuadorVazio ? (
        <Tooltip title={"Clique para " + (mm.status == "ligado" ? "desligar" : "ligar")}>
          <IconButton
            onClick={() => {
              // console.log("Imagem clicada");
              triggerButton(mm.id);
            }}
          >
            <img src={mm.status == "ligado" ? iconArOn : iconArOff} alt="logo" width={45} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Endereço do atuador está vazio">
          <img src={iconArLock} alt="logo" width={45} />
        </Tooltip>
      ),
      action: (
        <MenuFlutuante
          deleteButton={() => deleteButton(index)}
          editButton={() => editButton(mm.id)}
        />
      ),
    })),
  };
}
