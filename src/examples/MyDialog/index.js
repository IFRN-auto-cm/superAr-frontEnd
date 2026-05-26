import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import MDButton from "components/MDButton";

import CircularProgress from "@mui/material/CircularProgress";
// import ErrorOutlineIcon from "@mui/material/icons/ErrorOutline";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

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

export default WaitData;
