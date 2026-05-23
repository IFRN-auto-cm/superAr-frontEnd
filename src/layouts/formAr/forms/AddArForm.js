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

function AddArForm({
  defaultValue,
  showForm,
  setShowForm,
  // isToUpdate,
  // setIsToUpdate
}) {
  const comandos = [
    { index: 1, valor: "", nome: "Desligar" },
    { index: 2, valor: "", nome: "Ligar 30º" },
    { index: 3, valor: "", nome: "Ligar 29º" },
    { index: 4, valor: "", nome: "Ligar 28º" },
    { index: 5, valor: "", nome: "Ligar 27º" },
    { index: 6, valor: "", nome: "Ligar 26º" },
  ];

  const [inputMarca, setInputMarca] = useState(defaultValue.marca);
  const [inputModelo, setInputModelo] = useState(defaultValue.modelo);
  const { columns: cColumns, rows: cRows } = commandsTableData(comandos);

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
      <DialogTitle>Adicionar novo modelo de ar</DialogTitle>
      <DialogContent dividers>
        <Card>
          <MDInput
            type="text"
            label="Marca"
            required="true"
            onChange={handleMarca}
            defaultValue=""
            fullWidth
          ></MDInput>
          <MDBox pt={1}></MDBox>
          <MDInput
            type="text"
            label="Modelo"
            required="true"
            onChange={handleModelo}
            defaultValue=""
            fullWidth
          ></MDInput>
          <MDBox pt={1}></MDBox>
          <DataTable
            table={{ columns: cColumns, rows: cRows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
          <Comando name="Desligar" />
          <Comando name="Ligar 30 graus" />
          <Comando name="Ligar 29 graus" />
          <Comando name="Ligar 28 graus" />
          <Comando name="Ligar 27 graus" />
          <Comando name="Ligar 26 graus" />
          <Comando name="Ligar 25 graus" />
          <Comando name="Ligar 24 graus" />
          <Comando name="Ligar 23 graus" />
          <Comando name="Ligar 22 graus" />
          <Comando name="Ligar 21 graus" />
          <Comando name="Ligar 20 graus" />
          <Comando name="Ligar 19 graus" />
          <Comando name="Ligar 18 graus" />
          <Comando name="Ligar 17 graus" />
          <Comando name="Ligar 16 graus" />
          <Comando name="Ligar 15 graus" />
          <Comando name="Ligar 14 graus" />
          <Comando name="Ligar 13 graus" />
          <Comando name="Ligar 12 graus" />
          <div className="actions">
            <MDButton
              className="button"
              onClick={() => {
                const data = {
                  marca: inputMarca,
                  modelo: inputModelo,
                };
              }}
            >
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
