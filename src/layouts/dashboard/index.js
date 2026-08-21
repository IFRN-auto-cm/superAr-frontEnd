/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react)
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { ReactComponent as Planta } from "assets/planta_p1.svg";
import PlantaArCondicionado from "layouts/dashboard/components/PlantaArCondicionado";

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const [arSelecionado, setArSelecionado] = useState(null);
  const [painelAberto, setPainelAberto] = useState(false);

  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        <PlantaArCondicionado
          rooms={{
            sala01: {
              acState: ["on"],
              tempC: 23.4,
            },

            sala02: {
              acState: ["off", "on", "on"],
              tempC: 27.1,
            },

            sala03: {
              acState: ["unmanaged"],
              tempC: null,
            },

            sala04: {
              acState: ["on", "on"],
              tempC: 23.4,
            },

            sala05: {
              acState: ["off"],
              tempC: 27.1,
            },

            sala06: {
              acState: ["on"],
              tempC: 22.37,
            },

            sala07: {
              acState: ["off"],
              tempC: 27.1,
            },

            sala08: {
              acState: ["unmanaged"],
              tempC: null,
            },

            sala09: {
              acState: ["on", "on", "off"],
              tempC: 32.37,
            },

            sala17: {
              acState: ["on"],
              tempC: 17.8,
            },

            sala18: {
              acState: ["on"],
              tempC: 17.8,
            },

            sala20: {
              acState: ["on"],
              tempC: 17.8,
            },

            sala23: {
              acState: ["off"],
              tempC: 27.1,
            },
          }}
          onRoomClick={(id, data) => {
            setArSelecionado({
              id,
              ...data,
            });

            setPainelAberto(true);
          }}
        />
      </MDBox>

      {/* Painel lateral com informações do ar-condicionado */}
      <Drawer anchor="right" open={painelAberto} onClose={() => setPainelAberto(false)}>
        <MDBox
          sx={{
            width: {
              xs: 320,
              sm: 420,
            },
            p: 3,
          }}
        >
          {/* Cabeçalho */}
          <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <MDTypography variant="h5">Informações do aparelho</MDTypography>

            <IconButton onClick={() => setPainelAberto(false)}>
              <CloseIcon />
            </IconButton>
          </MDBox>

          <Divider sx={{ mb: 3 }} />

          {/* Informações do aparelho selecionado */}
          {arSelecionado && (
            <>
              <MDTypography variant="h6" mb={3}>
                Ar-condicionado {arSelecionado.id}
              </MDTypography>

              <MDTypography variant="body2" mb={2}>
                <strong>Sala:</strong> {arSelecionado.id}
              </MDTypography>

              <MDTypography variant="body2" mb={2}>
                <strong>Temperatura:</strong>{" "}
                {Number.isFinite(arSelecionado.tempC)
                  ? `${arSelecionado.tempC} °C`
                  : "Não informada"}
              </MDTypography>

              <MDTypography variant="body2" mb={2}>
                <strong>Estado:</strong>{" "}
                {arSelecionado.acState?.includes("on")
                  ? "Ligado"
                  : arSelecionado.acState?.includes("off")
                  ? "Desligado"
                  : "Não gerenciado"}
              </MDTypography>

              <Divider sx={{ my: 3 }} />

              <MDTypography variant="h6" mb={2}>
                Status do aparelho
              </MDTypography>

              <MDBox
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: arSelecionado.acState?.includes("on")
                    ? "rgba(46, 125, 50, 0.12)"
                    : "rgba(211, 47, 47, 0.12)",
                  border: "1px solid",
                  borderColor: arSelecionado.acState?.includes("on")
                    ? "success.main"
                    : "error.main",
                }}
              >
                <MDTypography
                  variant="h6"
                  color={arSelecionado.acState?.includes("on") ? "success" : "error"}
                >
                  {arSelecionado.acState?.includes("on")
                    ? "● Aparelho ligado"
                    : arSelecionado.acState?.includes("off")
                    ? "● Aparelho desligado"
                    : "● Não gerenciado"}
                </MDTypography>
              </MDBox>
            </>
          )}
        </MDBox>
      </Drawer>

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
