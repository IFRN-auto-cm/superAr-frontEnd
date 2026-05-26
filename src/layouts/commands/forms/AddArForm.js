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

function AddArForm({
  defaultValue,
  showForm,
  setShowForm,
  // isToUpdate,
  // setIsToUpdate
}) {
  const [inputNome, setInputNome] = useState(defaultValue.marca);
  const [update, setUpdate] = useState(true);
  const [showWait, setShowWait] = useState(false);
  const [waitConfig, setWaitConfig] = useState({
    message: "Esperando comando infravermelho",
    gif: "wait",
  });

  const handleBotao = () => {
    console.log("Comando index: ");

    // console.log("Tentando adquirir comando");
    setShowWait(true);
    setWaitConfig({ message: "Esperando a resposta do banco", gif: "wait" });
    const api = getApiAddress();

    fetch(api.database + "/comandos", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ nome: inputNome }),
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
          setWaitConfig({ message: "Erro: " + json["status"], gif: "erro" });
          // alert("erro:" + json["status"]);
        }
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   setInputMarca(defaultValue?.marca ?? "");
  //   setInputModelo(defaultValue?.modelo ?? "");
  // }, [identificadorUsuario]);

  const handleNome = (event) => {
    setInputNome(event.target.value);
    // console.log(event.target.value);
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
      <DialogTitle>Adicionar novos comandos</DialogTitle>
      <DialogContent dividers>
        <Card>
          <MDInput
            type="text"
            label="Nome"
            required="true"
            onChange={handleNome}
            defaultValue=""
            fullWidth
          ></MDInput>
          <MDBox pt={2}></MDBox>

          <div className="actions">
            <MDButton className="button" onClick={handleBotao}>
              atualizar
            </MDButton>
            <MDButton
              className="button"
              onClick={() => {
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
AddArForm.defaultProps = {
  identificadorUsuario: "",
  defaultValue: {
    marca: "",
    modelo: "",
  },
};

// Typechecking props for the DefaultInfoCard
AddArForm.propTypes = {
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
};

export default AddArForm;
