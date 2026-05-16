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

function AddArForm({
  defaultValue,
  showForm,
  setShowForm,
  // isToUpdate,
  // setIsToUpdate
}) {
  const [inputMarca, setInputMarca] = useState(defaultValue.marca);
  const [inputModelo, setInputModelo] = useState(defaultValue.modelo);

  // useEffect(() => {
  //   setInputMarca(defaultValue?.marca ?? "");
  //   setInputModelo(defaultValue?.modelo ?? "");
  // }, [identificadorUsuario]);

  const handleMarca = (event) => {
    setInputMarca(event.target.value);
  };
  const handleModelo = (event) => {
    setInputName(event.target.value);
  };

  // const dadosVaziosUsuario = {
  //   matricula: "",
  //   nome: "",
  //   ativo: "",
  //   chave: "",
  //   nivelGerencia: "usuário",
  //   tipoUsuario: "aluno",
  // };

  const Comando = ({ name }) => (
    <MDBox display="flex" alignItems="center">
      <MDInput type="text" label={name} defaultValue="" disabled fullWidth></MDInput>
      <MDButton
        variant="contained"
        onClick={() => {
          const api = getApiAddress();
          // setIsToUpdateUsers(false);
          // fetch(api.database + "/chave/" + identificadorUsuario, {
          //   method: "DELETE",
          //   body: JSON.stringify(identificadorUsuario),
          //   headers: { "Content-type": "application/json; charset=UTF-8" },
          // })
          //   .then((response) => response.json())
          //   .then((json) => {
          //     if (json["status"] == "ok") {
          //       alert("modificação realizada");
          //     } else {
          //       alert("erro:" + json["status"]);
          //     }
          //   })
          //   .catch((err) => console.log(err));
          //   // .finally(() => setIsToUpdateUsers(true));
        }}
      >
        <MDTypography variant="button" fontWeight="regular" color="text">
          Ler Comando
        </MDTypography>
      </MDButton>
    </MDBox>
  );
  Comando.propTypes = {
    name: PropTypes.string.isRequired,
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
                  matr: inputMarca,
                  nome: inputModelo,
                  tipoUsuario: inputTipoUsario[0],
                  tipoGerencia: inputTipoGeren[0],
                  usuarioAtivo:
                    inputUsuarioAtivo == true
                      ? 1
                      : inputUsuarioAtivo == false
                      ? 0
                      : inputUsuarioAtivo,
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
    matricula: PropTypes.string,
    nome: PropTypes.string,
    tipoUsuario: PropTypes.string,
    nivelGerencia: PropTypes.string,
    chave: PropTypes.string,
    usuarioAtivo: PropTypes.string,
  },
  showForm: PropTypes.bool.isRequired, // obrigatório e precisa ser string
  setShowForm: PropTypes.func.isRequired, // obrigatório e precisa ser função
};

export default EditUserForm;
