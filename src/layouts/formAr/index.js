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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import React, { useMemo, useState, useEffect } from "react";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/formAr/data/projectsTableData";
import AddArForm from "layouts/formAr/forms/AddArForm";

import getApiAddress from "serverAddress";

function Tables() {
  const [exibirArAdd, setExibirArAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [marcasModelos, setMarcasModelos] = useState([]);

  const mm = [
    { marca: "hitachi", modelo: "modelo 1" },
    { marca: "hitachi", modelo: "modelo 2" },
    { marca: "Midea", modelo: "modelo 1" },
  ];

  useEffect(() => {
    const api = getApiAddress();
    fetch(api.database + "/modelos-marcas", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // Authorization: "Bearer " + authData.tokenLocal,
      },
    })
      .then((res) => {
        // errorHandlingConnection(authData, res);
        return res.json();
      })
      .then((json) => {
        if (json.status == "ok") {
          setMarcasModelos(json.dados);
        } else {
          //setcomandos
        }
        // setComandos(json.dados);
      });
  }, [update]);

  // const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData(marcasModelos);

  const addAr = (event) => {
    console.log("passei aqui");
    setExibirArAdd(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Ar condicionado
                </MDTypography>
                <IconButton onClick={(e) => addAr(e)}>
                  <Icon>add</Icon>
                </IconButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <AddArForm
        // identificadorUsuario={identUsuarioEditar}
        // defaultValue={dadosUsuarioEditar}
        showForm={exibirArAdd}
        setShowForm={setExibirArAdd}
        // isToUpdate={isToUpdateUsers}
        // setIsToUpdate={setIsToUpdateUsers}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
