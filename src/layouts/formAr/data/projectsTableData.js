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
import LogoAr from "assets/images/logos/arcondicionado.png";
import MenuFlutuante from "examples/MenuFlutuante/Menu";

export default function data(marcasModelos, deleteButton, editButton) {
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

  return {
    columns: [
      { Header: "Marca", accessor: "project", width: "30%", align: "left" },
      { Header: "Modelo", accessor: "budget", align: "left" },
      // { Header: "Diferença", accessor: "completion", align: "center" },
      // { Header: "status", accessor: "status", align: "center" },
      { Header: "Menu", accessor: "action", align: "center" },
    ],

    rows: marcasModelos.map((mm, index) => ({
      // {
      project: <Project image={LogoAr} name={mm.marca} />,
      budget: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {mm.modelo}
        </MDTypography>
        // <Temperatura setpoint={30} medicao={29} />
      ),
      status: (
        <MDBox ml={-1}>
          <img src={iconArOff} alt="logo" width={45} />
        </MDBox>
      ),
      completion: <Progress color="info" value={60} />,
      action: (
        <MenuFlutuante
          deleteButton={() => deleteButton(index)}
          editButton={() => editButton(index)}
        />
      ),
    })),
  };
}
