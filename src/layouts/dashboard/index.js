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
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

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

  // Estado centralizado das salas para permitir atualização em tempo real
  const [rooms, setRooms] = useState({
    sala09: { acState: ["on"], tempC: 23.4 },
    sala02: { acState: ["off", "on", "on"], tempC: 27.1 },
    sala203: { acState: ["unmanaged"], tempC: null },
    sala204: { acState: ["on", "on"], tempC: 23.4 },
    sala05: { acState: ["off"], tempC: 27.1 },
    sala06: { acState: ["on"], tempC: 22.37 },
    sala07: { acState: ["off"], tempC: 27.1 },
    sala08: { acState: ["unmanaged"], tempC: null },
    sala09: { acState: ["on", "on", "off"], tempC: 32.37 },
    sala17: { acState: ["on"], tempC: 17.8 },
    sala18: { acState: ["on"], tempC: 17.8 },
    sala20: { acState: ["on"], tempC: 17.8 },
    sala23: { acState: ["off"], tempC: 27.1 },
  });

  const { sales, tasks } = reportsLineChartData;

  // Atualiza o estado da sala no objeto centralizado e na seleção atual
  const updateRoomState = (roomId, newAcState, newTemp) => {
    setRooms((prev) => {
      const updated = {
        ...prev,
        [roomId]: {
          ...prev[roomId],
          ...(newAcState !== undefined && { acState: newAcState }),
          ...(newTemp !== undefined && { tempC: newTemp }),
        },
      };

      if (arSelecionado && arSelecionado.id === roomId) {
        setArSelecionado({
          ...arSelecionado,
          ...updated[roomId],
        });
      }

      return updated;
    });
  };

  // Funções de controle do ar-condicionado
  const handleTogglePower = (powerState) => {
    if (!arSelecionado) return;
    updateRoomState(arSelecionado.id, [powerState], arSelecionado.tempC ?? 22);
  };

  const handleAdjustTemp = (delta) => {
    if (!arSelecionado || arSelecionado.tempC === null) return;
    const currentTemp = Number(arSelecionado.tempC) || 22;
    const newTemp = parseFloat((currentTemp + delta).toFixed(1));
    updateRoomState(arSelecionado.id, arSelecionado.acState, newTemp);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        <PlantaArCondicionado
          rooms={rooms}
          onRoomClick={(id, data) => {
            setArSelecionado({
              id,
              ...data,
            });

            setPainelAberto(true);
          }}
        />
      </MDBox>

      {/* Modal centralizado com informações do ar-condicionado */}
      <Dialog
        open={painelAberto}
        onClose={() => setPainelAberto(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 3,
            minWidth: { sm: "450px" },
          },
        }}
      >
        <MDBox sx={{ width: "100%", height: "100%" }}>
          {/* Cabeçalho */}
          <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <MDTypography variant="h5" noWrap>
              Informações do aparelho
            </MDTypography>

            <IconButton onClick={() => setPainelAberto(false)} sx={{ ml: 2 }}>
              <CloseIcon />
            </IconButton>
          </MDBox>

          <Divider sx={{ mb: 3 }} />

          {/* Informações do aparelho selecionado */}
          {arSelecionado && (
            <MDBox sx={{ maxHeight: "70vh", overflowY: "auto" }}>
              <MDTypography variant="h6" mb={3} noWrap>
                Ar-condicionado {arSelecionado.id}
              </MDTypography>

              <MDTypography variant="body2" mb={2} sx={{ whiteSpace: "nowrap" }}>
                <strong>Sala:</strong> {arSelecionado.id}
              </MDTypography>

              <MDTypography variant="body2" mb={2} sx={{ whiteSpace: "nowrap" }}>
                <strong>Temperatura:</strong>{" "}
                {Number.isFinite(arSelecionado.tempC)
                  ? `${arSelecionado.tempC} °C`
                  : "Não informada"}
              </MDTypography>

              <MDTypography variant="body2" mb={2} sx={{ whiteSpace: "nowrap" }}>
                <strong>Estado:</strong>{" "}
                {arSelecionado.acState?.includes("on")
                  ? "Ligado"
                  : arSelecionado.acState?.includes("off")
                  ? "Desligado"
                  : "Não gerenciado"}
              </MDTypography>

              {/* Painel de Controles: Ligar/Desligar e Alterar Temperatura */}
              {!arSelecionado.acState?.includes("unmanaged") && (
                <>
                  <Divider sx={{ my: 3 }} />

                  <MDTypography variant="h6" mb={2} noWrap>
                    Controles
                  </MDTypography>

                  {/* Botões Ligar / Desligar */}
                  <MDBox display="flex" gap={2} mb={3}>
                    <MDButton
                      variant={arSelecionado.acState?.includes("on") ? "gradient" : "outlined"}
                      color="success"
                      fullWidth
                      startIcon={<PowerSettingsNewIcon />}
                      onClick={() => handleTogglePower("on")}
                    >
                      Ligar
                    </MDButton>
                    <MDButton
                      variant={arSelecionado.acState?.includes("off") ? "gradient" : "outlined"}
                      color="error"
                      fullWidth
                      startIcon={<PowerSettingsNewIcon />}
                      onClick={() => handleTogglePower("off")}
                    >
                      Desligar
                    </MDButton>
                  </MDBox>

                  {/* Controle de Temperatura */}
                  <MDBox
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "background.default",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <MDTypography variant="button" fontWeight="bold">
                      Ajustar Temperatura
                    </MDTypography>

                    <MDBox display="flex" alignItems="center" gap={1}>
                      <IconButton
                        color="info"
                        onClick={() => handleAdjustTemp(-1)}
                        disabled={arSelecionado.tempC === null}
                      >
                        <RemoveIcon />
                      </IconButton>

                      {/* eslint-disable prettier/prettier */}
                      <MDTypography variant="h6" sx={{ minWidth: "65px", textAlign: "center" }}>
                        {Number.isFinite(arSelecionado.tempC) ? `${arSelecionado.tempC}°C` : "--"}
                      </MDTypography>

                      <IconButton
                        color="info"
                        onClick={() => handleAdjustTemp(1)}
                        disabled={arSelecionado.tempC === null}
                      >
                        <AddIcon />
                      </IconButton>
                    </MDBox>
                  </MDBox>
                </>
              )}

              <Divider sx={{ my: 3 }} />

              <MDTypography variant="h6" mb={2} noWrap>
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
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {arSelecionado.acState?.includes("on")
                    ? "● Aparelho ligado"
                    : arSelecionado.acState?.includes("off")
                    ? "● Aparelho desligado"
                    : "● Não gerenciado"}
                </MDTypography>
              </MDBox>
            </MDBox>
          )}
        </MDBox>
      </Dialog>

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
