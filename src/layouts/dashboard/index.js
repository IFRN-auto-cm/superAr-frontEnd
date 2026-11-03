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
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Switch from "@mui/material/Switch";
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
  const [alteracoesPendentes, setAlteracoesPendentes] = useState(null);
  const [valoresOriginais, setValoresOriginais] = useState(null);
  const [enviandoAlteracoes, setEnviandoAlteracoes] = useState(false);

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

  // Guarda as mudanças no modal sem enviá-las imediatamente.
  const handleTogglePower = (ligado) => {
    setAlteracoesPendentes((prev) => ({ ...prev, ligado }));
  };

  const handleAdjustTemp = (delta) => {
    setAlteracoesPendentes((prev) => {
      if (!prev || !Number.isFinite(prev.tempC)) return prev;
      return { ...prev, tempC: parseFloat((prev.tempC + delta).toFixed(1)) };
    });
  };

  const haAlteracoes =
    Boolean(arSelecionado?.gerenciavel && alteracoesPendentes && valoresOriginais) &&
    (alteracoesPendentes.ligado !== valoresOriginais.ligado ||
      alteracoesPendentes.tempC !== valoresOriginais.tempC);

  // Envia um único comando ao endpoint existente após o usuário confirmar.
  const handleEnviarAlteracoes = async () => {
    if (!arSelecionado?.gerenciavel || !haAlteracoes || enviandoAlteracoes) return;

    const temperatura = alteracoesPendentes.tempC ?? arSelecionado.tempC ?? 22;
    // O endpoint atual aceita "desligar" ou "ligar <temperatura>".
    const comandoNome = alteracoesPendentes.ligado
      ? `ligar ${Math.round(temperatura)}`
      : "desligar";

    setEnviandoAlteracoes(true);
    try {
      const response = await fetch(
        `http://localhost:5000/ar-cadastrados/${arSelecionado.rawId}/enviar-comando`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comando_nome: comandoNome }),
        }
      );
      const resultado = await response.json();
      if (!response.ok || resultado.status !== "ok") {
        throw new Error(resultado.mensagem || "Não foi possível enviar as alterações.");
      }

      const atualizacao = {
        acState: [alteracoesPendentes.ligado ? "on" : "off"],
        tempC: temperatura,
        statusConhecido: true,
        gerenciavel: true,
      };
      setRooms((prev) => ({
        ...prev,
        [arSelecionado.id]: { ...prev[arSelecionado.id], ...atualizacao },
      }));
      setArSelecionado((prev) => (prev ? { ...prev, ...atualizacao } : prev));
      const valoresEnviados = {
        ligado: Boolean(alteracoesPendentes.ligado),
        tempC: temperatura,
      };
      setAlteracoesPendentes(valoresEnviados);
      setValoresOriginais(valoresEnviados);
    } catch (err) {
      console.error("Erro ao enviar alterações para o ar:", err);
    } finally {
      setEnviandoAlteracoes(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        <PlantaArCondicionado
          rooms={rooms}
          onRoomClick={(id) => {
            // Garante a leitura direta do estado atualizado do rooms ao clicar na sala
            const roomData = rooms[id] || {
              acState: ["unmanaged"],
              tempC: null,
            };

            setArSelecionado({
              id,
              ...roomData,
            });
            const valoresAtuais = {
              ligado: roomData.acState?.includes("on") ?? false,
              tempC: roomData.tempC,
            };
            setAlteracoesPendentes(valoresAtuais);
            setValoresOriginais(valoresAtuais);

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

                  {/* Switch para ligar/desligar; a mudança fica pendente até enviar. */}
                  <MDBox display="flex" alignItems="center" justifyContent="center" mb={3}>
                    <MDTypography variant="button" fontWeight="medium">
                      Desligado
                    </MDTypography>
                    <FormControlLabel
                      sx={{ mx: 1 }}
                      control={
                        <Switch
                          checked={Boolean(alteracoesPendentes?.ligado)}
                          onChange={(event) => handleTogglePower(event.target.checked)}
                          inputProps={{
                            "aria-label": "Ligar ou desligar o ar-condicionado",
                          }}
                        />
                      }
                      label=""
                    />
                    <MDTypography variant="button" fontWeight="medium">
                      Ligado
                    </MDTypography>
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
                        disabled={!Number.isFinite(alteracoesPendentes?.tempC)}
                      >
                        <RemoveIcon />
                      </IconButton>

                      <MDTypography variant="h6" sx={{ minWidth: "65px", textAlign: "center" }}>
                        {Number.isFinite(alteracoesPendentes?.tempC)
                          ? `${alteracoesPendentes.tempC}°C`
                          : "--"}
                      </MDTypography>

                      <IconButton
                        color="info"
                        onClick={() => handleAdjustTemp(1)}
                        disabled={!Number.isFinite(alteracoesPendentes?.tempC)}
                      >
                        <AddIcon />
                      </IconButton>
                    </MDBox>
                  </MDBox>

                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    disabled={!haAlteracoes || enviandoAlteracoes}
                    onClick={handleEnviarAlteracoes}
                  >
                    {enviandoAlteracoes ? "Enviando..." : "Enviar Alterações"}
                  </MDButton>
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
