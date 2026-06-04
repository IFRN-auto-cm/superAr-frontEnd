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
import ArEditForm from "layouts/ArCondicionado/forms/EditArForm";
import { useState, useEffect } from "react";
import getApiAddress from "serverAddress";

function Tables() {
  const [exibirAddForm, setExibirAddForm] = useState(false);
  const [exibirEditForm, setExibirEditForm] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [update, setUpdate] = useState(false);
  const [condicionadoresAr, setCondicionadoresAr] = useState([]);

  const condicionadores = condicionadoresAr;

  useEffect(() => {
    const api = getApiAddress();
    fetch(api.database + "/ar-cadastrados", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // Authorization: "Bearer " + authData.tokenLocal,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.status == "ok") {
          // console.log(json);
          const dados = json.dados;
          const ca = [];
          dados.forEach((arCondicionando) => {
            ca.push({
              id: arCondicionando.id,
              sala: arCondicionando.sala_nome,
              codigo: arCondicionando.sala_cod,
              temperatura: {
                referencia: arCondicionando.temperatura_referencia,
                medicao: "",
              },
              status: "desligado",
              marca: arCondicionando.marca,
              modelo: arCondicionando.modelo,
              atuadorVazio: arCondicionando.atuador == "",
            });
          });
          setCondicionadoresAr(ca);
        }
      });
  }, [update]);

  const defaultValue = {
    salas: ["robotica", "estudo de info"],
    marcaModelo: [
      { marca: "hitachi", modelo: "modelo 1" },
      { marca: "Midea", modelo: "modelo 1" },
    ],
  };

  const addAr = () => {
    // console.log("addAr");
    setExibirAddForm(true);
  };

  const handleDelete = (index) => {
    console.log("delete");
  };

  const handleEdit = (id) => {
    setIdEdit(id);
    setExibirEditForm(true);
  };

  const handleOnOff = (id) => {
    const api = getApiAddress();
    console.log("acionar handle");
    // console.log(id);
    fetch(api.database + "/ar-cadastrados/" + id + "/enviar-comando", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        comando_id: 1,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (json.status == "ok") {
          //
        }
      });
  };

  // const { columns, rows } = authorsTableData();
  const { columns: aColumns, rows: aRows } = arCondTableData(
    condicionadores,
    handleDelete,
    handleEdit,
    handleOnOff
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
                  Condicionadores de Ar
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
        isToUpdate={update}
        setIsToUpdate={setUpdate}
      />
      <ArEditForm
        defaultValue={{ id: idEdit }}
        showForm={exibirEditForm}
        setShowForm={setExibirEditForm}
        isToUpdate={update}
        setIsToUpdate={setUpdate}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
