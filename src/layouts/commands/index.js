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
import getApiAddress from "serverAddress";

import AddCommandForm from "layouts/commands/forms/AddArForm";

// Data
import commandsTableData from "layouts/commands/data/commandsTableData";
import { useEffect, useState } from "react";
import WaitData from "examples/MyDialog";

function Tables() {
  // const comandos = [{ nome: "lugar1" }, { nome: "lugar2" }, { nome: "lugar3" }];
  const [exibirFormAdd, setExibirFormAdd] = useState(false);
  const [comandos, setComandos] = useState([]);
  const [waitMessage, setWaitMessage] = useState("Esperando banco de dados");
  const [showWait, setShowWait] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleDeleteButton = (index) => {
    const api = getApiAddress();
    const id = comandos[index].id;
    setShowWait(true);
    fetch(api.database + "/comandos/" + id, {
      method: "DELETE",
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
          setShowWait(false);
          setUpdate(!update);
        } else {
          setWaitMessage("Erro ao tentar acessar banco: " + json.status);
        }
      });
  };

  const { columns: columns, rows: rows } = commandsTableData(comandos, handleDeleteButton);

  const addCommand = (event) => {
    setExibirFormAdd(true);
  };

  console.log("airbnb");
  // const authData = useAuth();
  useEffect(() => {
    const api = getApiAddress();
    console.log("estou atualizando do banco");
    if (exibirFormAdd == false) {
      fetch(api.database + "/comandos", {
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
          setComandos(json.dados);
        });
    }
  }, [exibirFormAdd, update]);

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
                  Comandos
                </MDTypography>
                <IconButton onClick={(e) => addCommand(e)}>
                  <Icon>add</Icon>
                </IconButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: columns, rows: rows }}
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
      <AddCommandForm showForm={exibirFormAdd} setShowForm={setExibirFormAdd} />
      <WaitData message={waitMessage} gif={"wait"} showForm={showWait} setShowForm={setShowWait} />
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
