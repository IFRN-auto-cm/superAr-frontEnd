/*
=========================================================
- Material Dashboard 2 React - v2.2.0
=========================================================
*/

import { ReactComponent as Planta } from "assets/planta_p1.svg";
import PlantaArCondicionado from "layouts/dashboard/components/PlantaArCondicionado";

import { useState, useEffect } from "react";

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

// Mapeamento das salas (de acordo com as especificações da tarefa)
const sala_map = {
  A108: "sala08",
  212: "sala12",
  A211: "sala21",
  A111: "sala11",
  A208: "sala20",
};

const obterIdSala = (codigo) => {
  const codigoNormalizado = String(codigo ?? "")
    .trim()
    .toUpperCase();
  return sala_map[codigoNormalizado] || null;
};

const converterTemperatura = (...valores) => {
  for (const valor of valores) {
    if (valor === null || valor === undefined || valor === "" || valor === "desconhecido") continue;
    const temperatura = Number(valor);
    if (Number.isFinite(temperatura)) return temperatura;
  }
  return null;
};

function Dashboard() {
  const [arSelecionado, setArSelecionado] = useState(null);
  const [painelAberto, setPainelAberto] = useState(false);

  const [ares, setAres] = useState([]);

  const [rooms, setRooms] = useState({
    sala09: { acState: ["on"], tempC: 23.4 },
    sala02: { acState: ["off", "on", "on"], tempC: 27.1 },
    sala203: { acState: ["unmanaged"], tempC: null },
    sala204: { acState: ["on", "on"], tempC: 23.4 },
    sala05: { acState: ["off"], tempC: 27.1 },
    sala06: { acState: ["on"], tempC: 22.37 },
    sala07: { acState: ["off"], tempC: 27.1 },
    sala08: { acState: ["unmanaged"], tempC: null },
    sala12: { acState: ["unmanaged"], tempC: null },
    sala17: { acState: ["on"], tempC: 17.8 },
    sala18: { acState: ["on"], tempC: 17.8 },
    sala20: { acState: ["on"], tempC: 17.8 },
    sala23: { acState: ["off"], tempC: 27.1 },
  });

  const { sales, tasks } = reportsLineChartData;

  // Busca lista de ar-condicionados no backend Flask
  useEffect(() => {
    fetch("http://localhost:5000/ar-cadastrados")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok" && Array.isArray(data.dados)) {
          setAres(data.dados);

          setRooms((prevRooms) => {
            const updatedRooms = { ...prevRooms };

            data.dados.forEach((ar) => {
              // Converte o código do banco para o ID da sala existente na planta.
              const roomId = obterIdSala(ar.sala_cod);
              if (!roomId) {
                console.warn("Código de sala sem correspondência na planta:", ar.sala_cod);
                return;
              }

              // Status desconhecido não torna um aparelho cadastrado não gerenciável.
              const status = String(ar.status ?? "")
                .trim()
                .toLowerCase();
              let acState = ["unmanaged"];
              if (status === "ligado" || status === "on") {
                acState = ["on"];
              } else if (status === "desligado" || status === "off") {
                acState = ["off"];
              }

              const tempVal = converterTemperatura(
                ar.temperatura_medida,
                ar.temperatura_setpoint,
                ar.temperatura_referencia
              );

              updatedRooms[roomId] = {
                acState,
                tempC: tempVal,
                rawId: ar.id,
                gerenciavel: true,
                statusConhecido: acState[0] !== "unmanaged",
                salaCod: ar.sala_cod,
                salaNome: ar.sala_nome,
                nomeAr: ar.nome_ar,
                marca: ar.marca,
                modelo: ar.modelo,
                atuador: ar.atuador,
              };
            });

            return updatedRooms;
          });
        }
      })
      .catch((err) => console.error("Erro ao buscar ares cadastrados:", err));
  }, []);

  // =====================================================
  // CONTROLE DO AR
  // =====================================================

  const updateRoomState = (roomId, newAcState, newTemp) => {
    const targetAr = ares.find((item) => obterIdSala(item.sala_cod) === roomId);

    const dbId = targetAr ? targetAr.id : arSelecionado?.rawId;

    // Atualização otimista da UI
    setRooms((prev) => {
      const updated = {
        ...prev,
        [roomId]: {
          ...prev[roomId],
          ...(newAcState !== undefined && { acState: newAcState }),
          ...(newAcState !== undefined && { statusConhecido: !newAcState.includes("unmanaged") }),
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

    // Se temos o ID cadastrado do banco, envia o comando
    if (dbId) {
      const isPowerOn = newAcState
        ? newAcState.includes("on") || (newAcState.includes("unmanaged") && newTemp !== undefined)
        : false;
      const temperatura = newTemp ?? arSelecionado?.tempC ?? 22;
      const comandoNome = isPowerOn ? `ligar ${Math.round(temperatura)}` : "desligar";

      fetch(`http://localhost:5000/ar-cadastrados/${dbId}/enviar-comando`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comando_nome: comandoNome }),
      }).catch((err) => console.error("Erro ao enviar comando para o ar:", err));
    }
  };

  const handleTogglePower = (powerState) => {
    if (!arSelecionado) return;

    updateRoomState(arSelecionado.id, [powerState], arSelecionado.tempC ?? 22);
  };

  const handleAdjustTemp = (delta) => {
    if (!arSelecionado || arSelecionado.tempC === null) {
      return;
    }

    const currentTemp = Number(arSelecionado.tempC) || 22;
    const newTemp = parseFloat((currentTemp + delta).toFixed(1));
    const estadoAtualizado = arSelecionado.acState?.includes("unmanaged")
      ? ["on"]
      : arSelecionado.acState;

    updateRoomState(arSelecionado.id, estadoAtualizado, newTemp);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        <PlantaArCondicionado
          rooms={rooms}
          onRoomClick={(id) => {
            // Garante a leitura direta do estado atualizado do rooms ao clicar na sala
            const roomData = rooms[id] || { acState: ["unmanaged"], tempC: null };

            setArSelecionado({
              id,
              ...roomData,
            });

            setPainelAberto(true);
          }}
        />
      </MDBox>

      {/* MODAL */}
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

          {/* Informações */}
          {arSelecionado && (
            <MDBox sx={{ maxHeight: "70vh", overflowY: "auto" }}>
              <MDTypography variant="h6" mb={3} noWrap>
                Ar-condicionado {arSelecionado.nomeAr || arSelecionado.id}
              </MDTypography>

              <MDTypography variant="body2" mb={2} sx={{ whiteSpace: "nowrap" }}>
                <strong>Sala:</strong>{" "}
                {arSelecionado.salaNome || arSelecionado.salaCod || arSelecionado.id}
              </MDTypography>

              {/* Exibição da Marca e Modelo (caso retornados do backend) */}
              {arSelecionado.marca && (
                <MDTypography variant="body2" mb={2} sx={{ whiteSpace: "nowrap" }}>
                  <strong>Marca / Modelo:</strong> {arSelecionado.marca}{" "}
                  {arSelecionado.modelo ? `- ${arSelecionado.modelo}` : ""}
                </MDTypography>
              )}

              {/*  Exibição do Atuador / Endereço (caso retornado do backend) */}
              {arSelecionado.atuador && (
                <MDTypography variant="body2" mb={2} sx={{ whiteSpace: "nowrap" }}>
                  <strong>Atuador / Endereço:</strong> {arSelecionado.atuador}
                </MDTypography>
              )}

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
                  : arSelecionado.gerenciavel
                  ? "Status desconhecido"
                  : "Não gerenciado"}
              </MDTypography>

              {/* CONTROLES */}
              {arSelecionado.gerenciavel && (
                <>
                  <Divider sx={{ my: 3 }} />

                  <MDTypography variant="h6" mb={2} noWrap>
                    Controles
                  </MDTypography>

                  {/* Ligar / Desligar */}
                  <MDBox mb={3}>
                    {arSelecionado.acState?.includes("on") ? (
                      <MDButton
                        variant="gradient"
                        color="error"
                        fullWidth
                        startIcon={<PowerSettingsNewIcon />}
                        onClick={() => handleTogglePower("off")}
                      >
                        Desligar
                      </MDButton>
                    ) : (
                      <MDButton
                        variant="gradient"
                        color="success"
                        fullWidth
                        startIcon={<PowerSettingsNewIcon />}
                        onClick={() => handleTogglePower("on")}
                      >
                        Ligar
                      </MDButton>
                    )}
                  </MDBox>

                  {/* Temperatura */}
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

              {/* STATUS */}
              <MDTypography variant="h6" mb={2} noWrap>
                Status do aparelho
              </MDTypography>

              <MDBox
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: arSelecionado.acState?.includes("on")
                    ? "rgba(46, 125, 50, 0.12)"
                    : arSelecionado.gerenciavel && !arSelecionado.statusConhecido
                    ? "rgba(237, 108, 2, 0.12)"
                    : "rgba(211, 47, 47, 0.12)",
                  border: "1px solid",
                  borderColor: arSelecionado.acState?.includes("on")
                    ? "success.main"
                    : arSelecionado.gerenciavel && !arSelecionado.statusConhecido
                    ? "warning.main"
                    : "error.main",
                }}
              >
                <MDTypography
                  variant="h6"
                  color={
                    arSelecionado.acState?.includes("on")
                      ? "success"
                      : arSelecionado.gerenciavel && !arSelecionado.statusConhecido
                      ? "warning"
                      : "error"
                  }
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {arSelecionado.acState?.includes("on")
                    ? "● Aparelho ligado"
                    : arSelecionado.acState?.includes("off")
                    ? "● Aparelho desligado"
                    : arSelecionado.gerenciavel
                    ? "● Aguardando status do aparelho"
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
// index.js
// Exibindo index.js.
