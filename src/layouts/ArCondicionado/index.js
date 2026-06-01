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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
import arCondTableData from "layouts/ArCondicionado/data/arCondicionadoTableData";
import ArAddForm from "layouts/ArCondicionado/forms/AddArForm";
import { useState } from "react";

function Tables() {
  const [exibirAddForm, setExibirAddForm] = useState(false);
  const [update, setUpdate] = useState(false);

  const condicionadores = [
    {
      sala: "robótica",
      temperatura: { referencia: 20, medicao: 23 },
      status: "ligado",
      marca: "Hitachi",
      modelo: "AirHome 600 Inverter",
    },
    {
      sala: "TI",
      temperatura: { referencia: 17, medicao: 20 },
      status: "ligado",
      marca: "Midea",
      modelo: "modelo 1",
    },
    {
      sala: "Lab. maker",
      temperatura: { referencia: 15, medicao: 25 },
      status: "desligado",
      marca: "Hitachi",
      modelo: "modelo 1",
    },
    {
      sala: "Estudo de informática",
      temperatura: { referencia: 15, medicao: 25 },
      status: "desligado",
      marca: "Hitachi",
      modelo: "modelo 1",
    },
  ];

  const defaultValue = {
    salas: ["robotica", "estudo de info"],
    marcaModelo: [
      { marca: "hitachi", modelo: "modelo 1" },
      { marca: "Midea", modelo: "modelo 1" },
    ],
  };

  const addAr = () => {
    console.log("addAr");
    setExibirAddForm(true);
  };

  const handleDelete = (index) => {
    console.log("delete");
  };

  const handleEdit = (index) => {
    console.log("edit");
  };

  // const { columns, rows } = authorsTableData();
  const { columns: aColumns, rows: aRows } = arCondTableData(
    condicionadores,
    handleDelete,
    handleEdit
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          {/* <Grid item xs={12}>
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
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
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
                  Ares Condicionados
                </MDTypography>
                <IconButton onClick={(e) => addAr(e)}>
                  <Icon>add</Icon>
                </IconButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: aColumns, rows: aRows }}
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
      <ArAddForm
        defaultValue={defaultValue}
        showForm={exibirAddForm}
        setShowForm={setExibirAddForm}
        update={update}
        setUpdate={setUpdate}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
