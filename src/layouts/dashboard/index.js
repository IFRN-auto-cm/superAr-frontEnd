/*
=========================================================
- Material Dashboard 2 React - v2.2.0
=========================================================
*/

import { ReactComponent as Planta } from "assets/planta_p1.svg";
import PlantaArCondicionado, {
  MAPAS_DISPONIVEIS,
} from "layouts/dashboard/components/PlantaArCondicionado";

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
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

<<<<<<< HEAD
=======
const temAtuadorCadastrado = (atuador) => {
  const valor = String(atuador ?? "")
    .trim()
    .toLowerCase();
  return !["", "null", "none", "desconhecido", "não cadastrado", "nao cadastrado"].includes(valor);
};

>>>>>>> alteraçao_ligar_desligar_no_modal_e_botaonavegaçao_entre_maps
function Dashboard() {
  const [arSelecionado, setArSelecionado] = useState(null);
  const [painelAberto, setPainelAberto] = useState(false);
  const [alteracoesPendentes, setAlteracoesPendentes] = useState(null);
  const [valoresOriginais, setValoresOriginais] = useState(null);
  const [enviandoAlteracoes, setEnviandoAlteracoes] = useState(false);

  const [ares, setAres] = useState([]);
  const [mapaSelecionado, setMapaSelecionado] = useState("planta_p1_v6.svg");
  const [sidenavMapasAberto, setSidenavMapasAberto] = useState(false);

<<<<<<< HEAD
  const [ares, setAres] = useState([]);

=======
>>>>>>> alteraçao_ligar_desligar_no_modal_e_botaonavegaçao_entre_maps
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
<<<<<<< HEAD

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
=======
>>>>>>> alteraçao_ligar_desligar_no_modal_e_botaonavegaçao_entre_maps

          setRooms((prevRooms) => {
            const updatedRooms = { ...prevRooms };

<<<<<<< HEAD
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
=======
            data.dados.forEach((ar) => {
              // Converte o código do banco para o ID da sala existente na planta.
              const roomId = obterIdSala(ar.sala_cod);
              if (!roomId) {
                console.warn("Código de sala sem correspondência na planta:", ar.sala_cod);
                return;
              }

              // Até consultar a disponibilidade, o estado fica neutro/cinza:
              // o status de power do GET de cadastro pode ser uma leitura antiga.
              const acState = ["unmanaged"];

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
                online: false,
                salaCod: ar.sala_cod,
                salaNome: ar.sala_nome,
                nomeAr: ar.nome_ar,
                marca: ar.marca,
                modelo: ar.modelo,
                atuador: ar.atuador,
                atuadorDisponivel: temAtuadorCadastrado(ar.atuador),
              };
            });

            return updatedRooms;
          });
        }
      })
      .catch((err) => console.error("Erro ao buscar ares cadastrados:", err));
  }, []);

  // Consulta periodicamente online/offline e o estado real (power) no backend.
  useEffect(() => {
    if (ares.length === 0) return undefined;

    let cancelado = false;
    const atualizarDisponibilidade = async () => {
      await Promise.all(
        ares.map(async (ar) => {
          const roomId = obterIdSala(ar.sala_cod);
          if (!roomId) return;

          try {
            const response = await fetch(`http://localhost:5000/status-ar/${ar.id}`);
            const data = await response.json();
            if (!response.ok || data.status !== "ok" || cancelado) return;

            const resultado = data.resultado;
            const online = resultado?.online === true;
            const power = resultado?.power;
            const acState =
              online && typeof power === "boolean" ? [power ? "on" : "off"] : ["unmanaged"];
            const atualizacao = {
              online,
              acState,
              statusConhecido: online && typeof power === "boolean",
              ...(online && Number.isFinite(resultado?.temperatura_medida)
                ? { tempC: resultado.temperatura_medida }
                : {}),
            };

            setRooms((prev) => ({
              ...prev,
              [roomId]: { ...prev[roomId], ...atualizacao },
            }));
            setArSelecionado((prev) => (prev?.id === roomId ? { ...prev, ...atualizacao } : prev));
          } catch (err) {
            console.error(`Erro ao consultar disponibilidade do aparelho ${ar.id}:`, err);
          }
        })
      );
    };

    atualizarDisponibilidade();
    const intervalo = window.setInterval(atualizarDisponibilidade, 10000);
    return () => {
      cancelado = true;
      window.clearInterval(intervalo);
    };
  }, [ares]);

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
>>>>>>> alteraçao_ligar_desligar_no_modal_e_botaonavegaçao_entre_maps
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

  // Mantém o botão da planta como ponto de abertura do sidenav de mapas.
  const ConfigsButton = () => (
    <IconButton
      aria-label="Abrir mapas dos laboratórios"
      aria-haspopup="true"
      aria-expanded={sidenavMapasAberto}
      onClick={() => setSidenavMapasAberto(true)}
      sx={(theme) => ({
        position: "fixed",
        top: "20%",
        right: 24,
        zIndex: theme.zIndex.drawer - 1,
        width: 48,
        height: 48,
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: 2,
        "&:hover": { bgcolor: "background.paper" },
      })}
    >
      <NavigateBeforeIcon />
    </IconButton>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
<<<<<<< HEAD
        <PlantaArCondicionado
          rooms={rooms}
          onRoomClick={(id) => {
            // Garante a leitura direta do estado atualizado do rooms ao clicar na sala
            const roomData = rooms[id] || { acState: ["unmanaged"], tempC: null };

            setArSelecionado({
              id,
              ...roomData,
            });
=======
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} md={12}>
            <PlantaArCondicionado
              rooms={rooms}
              mapaId={mapaSelecionado}
              onRoomClick={(id) => {
                // Garante a leitura direta do estado atualizado do rooms ao clicar na sala
                const roomData = rooms[id] || {
                  acState: ["unmanaged"],
                  tempC: null,
                };
>>>>>>> alteraçao_ligar_desligar_no_modal_e_botaonavegaçao_entre_maps

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
          </Grid>
        </Grid>

        <ConfigsButton />

        <Drawer
          anchor="right"
          open={sidenavMapasAberto}
          onClose={() => setSidenavMapasAberto(false)}
          PaperProps={{
            sx: { width: { xs: "85vw", sm: 340 }, maxWidth: 380, p: 2 },
          }}
        >
          <MDBox display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <MDTypography variant="h6">Mapas dos laboratórios/salas</MDTypography>
            <IconButton
              aria-label="Fechar mapas dos laboratórios/salas"
              onClick={() => setSidenavMapasAberto(false)}
            >
              <CloseIcon />
            </IconButton>
          </MDBox>
          <Divider />
          <List>
            {MAPAS_DISPONIVEIS.map((mapa) => (
              <ListItemButton
                key={mapa.id}
                selected={mapaSelecionado === mapa.id}
                onClick={() => {
                  setMapaSelecionado(mapa.id);
                  setSidenavMapasAberto(false);
                }}
              >
                <ListItemText primary={mapa.nome} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
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
                {arSelecionado.online === false && arSelecionado.gerenciavel
                  ? "Offline"
                  : arSelecionado.acState?.includes("on")
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
                  {!arSelecionado.atuadorDisponivel && (
                    <MDTypography variant="body2" color="error" mb={2}>
                      Controles indisponíveis: não há Atuador/Endereço cadastrado para este
                      aparelho.
                    </MDTypography>
                  )}

<<<<<<< HEAD
                  {/* Ligar / Desligar */}
                  <MDBox mb={3}>
                    {arSelecionado.acState?.includes("on") ? (
                      <MDButton
                        variant="gradient"
                        color="error"
                        fullWidth
                        startIcon={<PowerSettingsNewIcon />}
                        onClick={() => handleTogglePower("off")}
=======
                  {/* Smooth Toggle; a mudança fica pendente até o envio ser confirmado. */}
                  <MDBox display="flex" alignItems="center" justifyContent="center" mb={1}>
                    <MDBox textAlign="center">
                      <MDTypography variant="caption" display="block" mb={1}></MDTypography>
                      <MDBox
                        component="button"
                        type="button"
                        role="switch"
                        aria-checked={Boolean(alteracoesPendentes?.ligado)}
                        aria-label="Smooth Toggle para ligar ou desligar"
                        disabled={!arSelecionado.atuadorDisponivel}
                        onClick={() => handleTogglePower(!Boolean(alteracoesPendentes?.ligado))}
                        sx={(theme) => {
                          const ligado = Boolean(alteracoesPendentes?.ligado);
                          return {
                            position: "relative",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: ligado ? "flex-start" : "flex-end",
                            width: 148,
                            height: 44,
                            px: ligado ? 1.5 : 1.25,
                            border: 0,
                            borderRadius: "999px",
                            bgcolor: ligado ? theme.palette.success.main : theme.palette.grey[500],
                            color: "#fff",
                            font: "inherit",
                            cursor: "pointer",
                            transition: "background-color 220ms ease",
                            "&:disabled": { opacity: 0.55, cursor: "not-allowed" },
                            "&:focus-visible": {
                              outline: `2px solid ${theme.palette.info.main}`,
                              outlineOffset: 3,
                            },
                          };
                        }}
>>>>>>> alteraçao_ligar_desligar_no_modal_e_botaonavegaçao_entre_maps
                      >
                        <MDTypography
                          variant="button"
                          fontWeight="bold"
                          color="white"
                          sx={{ zIndex: 1 }}
                        >
                          {alteracoesPendentes?.ligado ? "Ligado" : "Desligado"}
                        </MDTypography>
                        <MDBox
                          sx={(theme) => ({
                            position: "absolute",
                            top: 4,
                            left: alteracoesPendentes?.ligado ? "calc(100% - 40px)" : 4,
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            bgcolor: "white",
                            boxShadow: theme.shadows[2],
                            transition: "left 220ms cubic-bezier(0.4, 0, 0.2, 1)",
                          })}
                        />
                      </MDBox>
                    </MDBox>
                  </MDBox>
                  <MDTypography variant="caption" display="block" textAlign="center" mb={3}>
                    As alterações só seram enviadas se clicar no botão &quot;Enviar
                    Alterações&quot;.
                  </MDTypography>

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
                        disabled={
                          !arSelecionado.atuadorDisponivel ||
                          !Number.isFinite(alteracoesPendentes?.tempC)
                        }
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
                        disabled={
                          !arSelecionado.atuadorDisponivel ||
                          !Number.isFinite(alteracoesPendentes?.tempC)
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </MDBox>
                  </MDBox>

                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    disabled={
                      !arSelecionado.atuadorDisponivel || !haAlteracoes || enviandoAlteracoes
                    }
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
<<<<<<< HEAD
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
=======
                  backgroundColor:
                    arSelecionado.online === false && arSelecionado.gerenciavel
                      ? "rgba(158, 158, 158, 0.12)"
                      : arSelecionado.acState?.includes("on")
                      ? "rgba(46, 125, 50, 0.12)"
                      : arSelecionado.gerenciavel && !arSelecionado.statusConhecido
                      ? "rgba(237, 108, 2, 0.12)"
                      : "rgba(211, 47, 47, 0.12)",
                  border: "1px solid",
                  borderColor:
                    arSelecionado.online === false && arSelecionado.gerenciavel
                      ? "grey.500"
                      : arSelecionado.acState?.includes("on")
                      ? "success.main"
                      : arSelecionado.gerenciavel && !arSelecionado.statusConhecido
                      ? "warning.main"
                      : "error.main",
>>>>>>> alteraçao_ligar_desligar_no_modal_e_botaonavegaçao_entre_maps
                }}
              >
                <MDTypography
                  variant="h6"
                  color={
<<<<<<< HEAD
                    arSelecionado.acState?.includes("on")
=======
                    arSelecionado.online === false && arSelecionado.gerenciavel
                      ? "text"
                      : arSelecionado.acState?.includes("on")
>>>>>>> alteraçao_ligar_desligar_no_modal_e_botaonavegaçao_entre_maps
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
<<<<<<< HEAD
// index.js
// Exibindo index.js.
=======

>>>>>>> alteraçao_ligar_desligar_no_modal_e_botaonavegaçao_entre_maps
