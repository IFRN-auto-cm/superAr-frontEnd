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

import Button from "@mui/material/Button";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";

export default function data(comandos, handleBotao) {
  const ComandoName = ({ name, valor }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
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
            <MDBox
              sx={{
                maxWidth: "250px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {valor}
            </MDBox>
          </MDTypography>
        </MDBox>
      )}
    </MDBox>
  );

  return {
    columns: [
      { Header: "Comandos", accessor: "project", width: "60%", align: "left" },
      { Header: "Ler Comando", accessor: "action", align: "center" },
    ],

    rows: comandos.map((comando, index) => ({
      project: <ComandoName name={comando.nome} valor={comando.valor} />,
      action: (
        <Button
          variant="text"
          onClick={() => handleBotao(index)}
          startIcon={<SettingsRemoteIcon color="secondary" fontSize="large" />}
        >
          <MDTypography fontSize="small" color="secondary">
            Ler infravermelho
          </MDTypography>
        </Button>
      ),
    })),
  };
}
