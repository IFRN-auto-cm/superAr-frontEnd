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
import Button from "@mui/material/Button";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import getApiAddress from "serverAddress";

import { useState } from "react";

export default function data(comandos) {
  const [valorComandos, setValorComandos] = useState(comandos);

  const ComandoName = ({ image, name, valor }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" variant="rounded" /> */}
      {valor === "" ? (
        <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
          {name}
        </MDTypography>
      ) : (
        <MDBox alignItems="center" lineHeight={1}>
          <MDTypography
            display="block"
            variant="button"
            fontWeight="medium"
            size="small"
            ml={1}
            lineHeight={1}
            sx={{ mb: 1 }}
          >
            {name + ":"}
          </MDTypography>
          <MDTypography
            display="block"
            variant="button"
            fontWeight="small"
            ml={1}
            lineHeight={1}
            // sx={{ mb: -3 }}
          >
            {valor}
          </MDTypography>
        </MDBox>
      )}
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
  console.log(comandos);
  const handleButao = (comandoIndex) => {
    console.log("Comando index: " + comandoIndex);

    console.log("Tentando adquirir comando");

    const api = getApiAddress();

    fetch(api.serial + "/readCommand", {
      method: "GET",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json["status"] === "ok") {
          console.log(json["comando"]);
          let cmds = valorComandos;
          cmds[comandoIndex].valor = json["comando"];
          setValorComandos(cmds);

          alert("comando adquirido");
        } else {
          alert("erro:" + json["status"]);
        }
      })
      .catch((err) => console.log(err));
  };

  return {
    columns: [
      { Header: "Comandos", accessor: "project", width: "60%", align: "left" },
      // { Header: "Temperatura", accessor: "budget", align: "left" },
      // { Header: "Diferença", accessor: "completion", align: "center" },
      // { Header: "status", accessor: "status", align: "center" },
      { Header: "Ler Comando", accessor: "action", align: "center" },
    ],

    rows: valorComandos.map((comando, index) => ({
      project: <ComandoName name={comando.nome} valor={comando.valor} />,
      action: (
        <Button
          variant="text"
          onClick={() => handleButao(index)}
          startIcon={<SettingsRemoteIcon color="secondary" fontSize="large" />}
        >
          <MDTypography fontSize="small" color="secondary">
            Ler sensor
          </MDTypography>
        </Button>
      ),
    })),
  };
}
