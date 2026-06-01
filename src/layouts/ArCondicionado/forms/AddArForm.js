import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

import { useState, useEffect, use } from "react";
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
import MySelect from "examples/MySelect";
import NumericField from "components/MyNumericField";

// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
// import Stack from "@mui/material/Stack";

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

function AddArForm({ defaultValue, showForm, setShowForm, isToUpdate, setIsToUpdate }) {
  const [marcasModelos, setMarcasModelos] = useState([]);
  const [salas, setSalas] = useState([]);

  const [inputNome, setInputNome] = useState("");
  const [inputAtuador, setInputAtuador] = useState("");
  const [idMarcaModelo, setIdMarcaModelo] = useState("");
  const [idSala, setIdSala] = useState("");
  const [temperatura, setTemperatura] = useState(25);
  // const [] = useState("");
  const [update, setUpdate] = useState(true);
  const [showWait, setShowWait] = useState(false);
  const [waitConfig, setWaitConfig] = useState({
    message: "Esperando retorno do banco",
    gif: "wait",
  });

  let itemS = [];
  salas.forEach((sala) => {
    const nome = sala.codigo + " - " + sala.nome;
    itemS.push({ nome: nome, id: sala.id });
  });

  const itemsSalas = itemS;

  // const itemsSalas = [
  //   { nome: "A208: Lab. de robótica", id: 0 },
  //   { nome: " 212: Lab. de estudo de info", id: 1 },
  // ];

  let items = [];
  marcasModelos.forEach((marcaModelo) => {
    const nome = marcaModelo.marca + ", modelo " + marcaModelo.modelo;
    items.push({ nome: nome, id: marcaModelo.id });
  });

  // const itemsMarcaModelo = [
  //   { nome: "Hitachi, modelo AirHome 600", id: 0 },
  //   { nome: "Mideia, modelo AI Ecomaster", id: 1 },
  // ];

  const itemsMarcaModelo = items;

  useEffect(() => {
    const api = getApiAddress();
    if (showForm == true) {
      fetch(api.database + "/getAddFomrArData", {
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
          console.log(json);
          setMarcasModelos(json.marcaModelo);
          setSalas(json.salas);
        });
    }
  }, [update, showForm]);

  const handleNome = (event) => {
    setInputNome(event.target.value);
  };

  const handleAtuador = (event) => {
    setInputAtuador(event.target.value);
  };

  const handleSendData = (event) => {
    const api = getApiAddress();
    const dataToApi = {
      marcaModeloId: idMarcaModelo,
      temperatura_referencia: temperatura,
      sala: idSala,
      status: "desligado",
      atuador: inputAtuador,
      nome: inputNome,
    };
    console.log(dataToApi);
    fetch(api.database + "/ar-cadastrados", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(dataToApi),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json["status"] === "ok") {
          // console.log(cmdsModificados.length);
          // if (cmdsModificados.length > 0) {
          //   // setMarcaModeloComandos(json["id"], cmdsModificados);
          // } else {
          //   setIsToUpdate(!isToUpdate);
          //   setShowWait(false);
          //   setShowForm(false);
          //   // alert("comando adquirido");
          // }
        } else {
          setShowWait(true);
          setWaitConfig({ message: "Erro: " + json["mensagem"], gif: "erro" });
          // alert("erro:" + json["status"]);
        }
      })
      .catch((err) => console.log(err));
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
      <DialogTitle>Adicionar novo ar condicionado</DialogTitle>
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
          <MDBox pt={1}></MDBox>
          <MySelect label="Sala" items={itemsSalas} required setValue={setIdSala} />
          <MDBox pt={1}></MDBox>
          <MySelect
            label="Marca e Modelo"
            items={itemsMarcaModelo}
            required
            setValue={setIdMarcaModelo}
          />
          <MDBox pt={1}></MDBox>
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "60%" }}
          >
            {/* <MDTypography sx={{ minWidth: 40, textAlign: "center" }}> Temperatura </MDTypography> */}
            Temperatura ao ligar:
            <NumericField defaultValue={25} setExtValue={setTemperatura} />
          </MDBox>
          <MDBox pt={1}></MDBox>
          <MDBox pt={1}></MDBox>
          <MDInput
            type="text"
            label="Endereço do atuador"
            onChange={handleAtuador}
            defaultValue=""
            fullWidth
          ></MDInput>

          {/* <MDInput
            type="text"
            label="Marca e modelo"
            required="true"
            onChange={handleModelo}
            defaultValue=""
            fullWidth
          ></MDInput>
          <MDBox pt={1}></MDBox> */}
          {/* <DataTable
            table={{ columns: cColumns, rows: cRows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={true}
            // noEndBorder
          /> */}
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
  isToUpdate: PropTypes.bool.isRequired,
  setIsToUpdate: PropTypes.func.isRequired,
};

export default AddArForm;
