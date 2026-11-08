import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Button from "@mui/material/Button";

function AgendamentoHeader() {
  return (
    <MDBox pt={3} pb={3}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >
        <MDBox>
          <MDTypography variant="h3" fontWeight="bold">
            Agendamentos
          </MDTypography>

          <MDTypography variant="h6" color="text">
            Rotinas automáticas dos condicionadores de ar
          </MDTypography>
        </MDBox>

        <Button variant="outlined" sx={{ color: "#ff0202" }}>
          Novo agendamento
        </Button>
      </MDBox>
    </MDBox>
  );
}

export default AgendamentoHeader;
