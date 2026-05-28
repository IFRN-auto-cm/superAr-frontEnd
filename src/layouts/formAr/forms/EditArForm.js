import PropTypes, { bool } from "prop-types";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

// import Popup from "reactjs-popup";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
// import MySelect from "layouts/tables/myComponents";

import getApiAddress from "serverAddress";
import DataTable from "examples/Tables/DataTable";
import commandsTableData from "layouts/formAr/data/commadsTableData";
import CircularProgress from "@mui/material/CircularProgress";
// import ErrorOutlineIcon from "@mui/material/icons/ErrorOutline";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import Box from "@mui/material/Box";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

function WaitData({ message, gif, showForm, setShowForm }) {
  return (
    <Dialog
      open={Boolean(showForm)}
      onClose={() => setShowForm(false)}
      // evita que o clique dentro do Dialog borbulhe e dispare handlers da linha/tabela
      onClick={(e) => e.stopPropagation()}
      PaperProps={{
        sx: {
          width: {
            xs: "90vw",
            sm: "75vw",
            md: "25vw",
          },
          maxWidth: "none",
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {message}
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "120px",
          }}
        >
          {gif == "erro" ? <ReportGmailerrorredIcon fontSize="large" /> : <CircularProgress />}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "120px",
          }}
        >
          <MDButton
            className="button"
            onClick={() => {
              setShowForm(false);
            }}
          >
            Cancelar
          </MDButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

WaitData.defaultProps = {
  message: "",
  gif: "wait",
};

// Typechecking props for the DefaultInfoCard
WaitData.propTypes = {
  message: PropTypes.string,
  gif: PropTypes.string,
  showForm: PropTypes.bool.isRequired, // obrigatório e precisa ser string
  setShowForm: PropTypes.func.isRequired, // obrigatório e precisa ser função
};

function EditArForm({ defaultValue, showForm, setShowForm, isToUpdate, setIsToUpdate }) {
  const [cmds, setCmds] = useState(defaultValue.comandos);
  const [cmdsModificados, setCmdsModificados] = useState([]);

  const [inputMarca, setInputMarca] = useState(defaultValue.marca);
  const [inputModelo, setInputModelo] = useState(defaultValue.modelo);
  const [update, setUpdate] = useState(true);
  const [showWait, setShowWait] = useState(false);
  const [waitConfig, setWaitConfig] = useState({
    message: "Esperando comando infravermelho",
    gif: "wait",
  });

  console.log(defaultValue);

  useEffect(() => {
    // const api = getApiAddress();
    // fetch(api.database + "/comandos", {
    //   method: "GET",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //     // Authorization: "Bearer " + authData.tokenLocal,
    //   },
    // })
    //   .then((res) => {
    //     // errorHandlingConnection(authData, res);
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setCmds(json.dados);
    //   });
  }, [update]);

  const handleBotao = (comandoIndex) => {
    console.log("Comando index: " + comandoIndex);

    // console.log("Tentando adquirir comando");
    setShowWait(true);
    setWaitConfig({ message: "Esperando comando infravermelho", gif: "wait" });
    const api = getApiAddress();

    fetch(api.serial + "/readCommand", {
      method: "GET",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json["status"] === "ok") {
          let c = cmds;
          let comandos_modificados = cmdsModificados;
          c[comandoIndex].valor = json["comando"];
          comandos_modificados.push(c[comandoIndex]);
          console.log(comandos_modificados);
          setCmds(c);
          setCmdsModificados(comandos_modificados);
          setShowWait(false);

          // alert("comando adquirido");
        } else {
          setShowWait(true);
          setWaitConfig({ message: "Erro: " + json["status"], gif: "erro" });
          // alert("erro:" + json["status"]);
        }
      })
      .catch((err) => console.log(err));
  };

  const { columns: cColumns, rows: cRows } = commandsTableData(cmds, handleBotao);

  // useEffect(() => {
  //   setInputMarca(defaultValue?.marca ?? "");
  //   setInputModelo(defaultValue?.modelo ?? "");
  // }, [identificadorUsuario]);

  const handleMarca = (event) => {
    setInputMarca(event.target.value);
  };
  const handleModelo = (event) => {
    setInputModelo(event.target.value);
  };

  const setMarcaModeloComandos = (id_comandoModelo, vetorCmds) => {
    const api = getApiAddress();
    console.log("vetorCmds");
    console.log(vetorCmds);
    fetch(api.database + "/modelos-marcas-comandos", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ modelo_marcas: id_comandoModelo, comandos: vetorCmds }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json["status"] === "ok") {
          setUpdate(!update);
          setShowWait(false);
          setShowForm(false);
          // alert("comando adquirido");
        } else {
          setShowWait(true);
          setWaitConfig({ message: "Erro: " + json["mensagem"], gif: "erro" });
          // alert("erro:" + json["status"]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSendData = (event) => {
    const api = getApiAddress();
    fetch(api.database + "/modelos-marcas", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ marca: inputMarca, modelo: inputModelo }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json["status"] === "ok") {
          console.log(cmdsModificados.length);
          if (cmdsModificados.length > 0) {
            setMarcaModeloComandos(json["id"], cmdsModificados);
          } else {
            setIsToUpdate(!isToUpdate);
            setShowWait(false);
            setShowForm(false);
            // alert("comando adquirido");
          }
        } else {
          setShowWait(true);
          setWaitConfig({ message: "Erro: " + json["mensagem"], gif: "erro" });
          // alert("erro:" + json["status"]);
        }
      })
      .catch((err) => console.log(err));
  };

  const Comando = ({ name, identificadorComando }) => {
    const [comando, setComando] = useState("");

    return (
      <MDBox display="flex" alignItems="center">
        <MDInput type="text" label={name} value={comando} disabled fullWidth />

        <MDButton
          variant="contained"
          onClick={() => {
            console.log("Tentando adquirir comando");

            const api = getApiAddress();

            fetch(api.serial + "/readCommand", {
              method: "GET",
              headers: { "Content-type": "application/json; charset=UTF-8" },
            })
              .then((response) => response.json())
              .then((json) => {
                if (json["status"] === "ok") {
                  console.log(json["comando"]);

                  setComando(json["comando"]);

                  alert("comando adquirido");
                } else {
                  alert("erro:" + json["status"]);
                }
              })
              .catch((err) => console.log(err));
          }}
        >
          <MDTypography variant="button" fontWeight="regular" color="text">
            Ler Comando
          </MDTypography>
        </MDButton>
      </MDBox>
    );
  };
  Comando.propTypes = {
    name: PropTypes.string.isRequired,
    identificadorComando: PropTypes.string.isRequired,
  };

  return (
    <Dialog
      open={Boolean(showForm)}
      onClose={() => setShowForm(false)}
      // evita que o clique dentro do Dialog borbulhe e dispare handlers da linha/tabela
      onClick={(e) => e.stopPropagation()}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Editar o modelo de ar</DialogTitle>
      <DialogContent dividers>
        <Card>
          <MDInput
            type="text"
            label="Marca"
            required="true"
            onChange={handleMarca}
            defaultValue={defaultValue.marca}
            fullWidth
          ></MDInput>
          <MDBox pt={1}></MDBox>
          <MDInput
            type="text"
            label="Modelo"
            required="true"
            onChange={handleModelo}
            defaultValue={defaultValue.modelo}
            fullWidth
          ></MDInput>
          <MDBox pt={1}></MDBox>
          <DataTable
            table={{ columns: cColumns, rows: cRows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={true}
            // noEndBorder
          />
          <div className="actions">
            <MDButton
              className="button"
              onClick={(e) => {
                handleSendData(e);
              }}
            >
              atualizar
            </MDButton>
            <MDButton
              className="button"
              onClick={(e) => {
                setShowForm(false);
              }}
            >
              Cancelar
            </MDButton>
          </div>
        </Card>
        <WaitData
          message={waitConfig.message}
          gif={waitConfig.gif}
          showForm={showWait}
          setShowForm={setShowWait}
        />
      </DialogContent>
    </Dialog>
  );
}

// Setting default values for the props of DefaultInfoCard
EditArForm.defaultProps = {
  identificadorUsuario: "",
  defaultValue: {
    marca: "",
    modelo: "",
  },
};

// Typechecking props for the DefaultInfoCard
EditArForm.propTypes = {
  identificadorUsuario: PropTypes.string,
  defaultValue: {
    marca: PropTypes.string,
    modelo: PropTypes.string,
    comandos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
      })
    ),
  },
  showForm: PropTypes.bool.isRequired, // obrigatório e precisa ser string
  setShowForm: PropTypes.func.isRequired, // obrigatório e precisa ser função
  isToUpdate: PropTypes.bool.isRequired,
  setIsToUpdate: PropTypes.func.isRequired,
};

export default EditArForm;
