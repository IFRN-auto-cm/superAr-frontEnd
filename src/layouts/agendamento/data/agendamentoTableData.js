/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://creative-tim.com
* Copyright 2023 Creative Tim (https://creative-tim.com)

Coded by ://creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import Tooltip from "@mui/material/Tooltip";

// Images
import LogoAr from "assets/images/logos/arcondicionado.png";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import iconArOn from "assets/images/arOn.png";
import iconArOff from "assets/images/arOff.png";
import iconArLock from "assets/images/arlock.png";
import MenuFlutuante from "examples/MenuFlutuante/Menu";
import IconButton from "@mui/material/IconButton";
import divider from "assets/theme/components/divider";
import iconOnButton from "assets/images/iconOn.png";
import iconOffButton from "assets/images/uncheck-icon.png";

export default function data(aresCondicionados, deleteButton, editButton, triggerButton) {
  const MarcaModelo = ({ image, sala, modelo }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={sala} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {sala}
        </MDTypography>
        <MDTypography variant="caption">{modelo}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="regular">
        {title}
      </MDTypography>
      {description && <MDTypography variant="caption">{description}</MDTypography>}
    </MDBox>
  );

  const Status = ({ online }) => {
    let cor = "light";
    if (online) {
      cor = "success";
    }
    return (
      <MDBox display="flex" justifyContent="center" alignItems="center" lineHeight={1}>
        <MDBox
          color="white"
          bgColor={cor}
          variant="gradient"
          borderRadius="50%"
          shadow="lg"
          opacity={1}
          p={1.2}
        />
      </MDBox>
    );
  };

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  // const Temperatura = ({ setpoint, medicao }) => (
  //   <MDBox>
  //     <MDBox display="flex" gap={0.5} lineHeight={1} textAlign="left">
  //       <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //         Referência:
  //       </MDTypography>
  //       <MDTypography variant="caption">
  //         {Number.isFinite(Number(setpoint)) && setpoint != null ? setpoint + "º" : "desconhecido"}
  //       </MDTypography>
  //     </MDBox>
  //     <MDBox display="flex" gap={2.1} lineHeight={1} textAlign="left">
  //       <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //         Medição:
  //       </MDTypography>
  //       <MDTypography variant="caption">
  //         {Number.isFinite(Number(medicao)) && medicao != null ? medicao + "º" : "desconhecido"}
  //       </MDTypography>
  //     </MDBox>
  //   </MDBox>
  // );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  console.log(aresCondicionados);

  const agendamentosImagem = [
    {
      nome: "Manhã - Labs",
      aparelhos: 4,
      dias: "Seg–Sex",
      liga: "07:00",
      desliga: "12:00",
      ativo: true,
    },
    {
      nome: "Tarde - A108",
      aparelhos: 2,
      dias: "Seg, Qua, Sex",
      liga: "13:00",
      desliga: "18:00",
      ativo: true,
    },
    {
      nome: "Aula sábado",
      aparelhos: 1,
      dias: "Sáb",
      liga: "07:30",
      desliga: "11:30",
      ativo: false,
    },
  ];

  const listaDados =
    Array.isArray(aresCondicionados) && aresCondicionados.length > 0
      ? aresCondicionados.slice(0, agendamentosImagem.length)
      : agendamentosImagem;

  return {
    columns: [
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Nome", accessor: "nome", width: "22%", align: "left" },
      { Header: "Condicionadores", accessor: "budget", align: "left" },
      { Header: "Dias", accessor: "completion", align: "left" },
      { Header: "Liga", accessor: "on", align: "center" },
      { Header: "Desliga", accessor: "off", align: "center" },
      { Header: "Ações", accessor: "action", align: "center" },
    ],
    rows: listaDados.map((mm, index) => {
      const ref = agendamentosImagem[index] || {};
      const nomeExibicao = mm.nome || ref.nome || mm.sala;
      const qtd = Number(mm.aparelhos ?? ref.aparelhos) || 0;
      const textoAparelhos = `${qtd} ${qtd === 1 ? "aparelho" : "aparelhos"}`;
      const textoDias = mm.dias || ref.dias || "Não definido";
      const horaLiga = mm.liga || ref.liga || "--:--";
      const horaDesliga = mm.desliga || ref.desliga || "--:--";
      const estaOnline =
        mm.status === "ligado" ? true : mm.status === "desligado" ? false : Boolean(ref.ativo);

      return {
        status: <Status online={estaOnline} />,
        nome: <Job title={nomeExibicao} description="" />,
        budget: <Job title={textoAparelhos} description="" />,
        completion: <Job title={textoDias} description="" />,
        on: (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            {horaLiga}
          </MDTypography>
        ),
        off: (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            {horaDesliga}
          </MDTypography>
        ),
        action: (
          <MDBox display="flex" alignItems="center" justifyContent="center" gap={0.5}>
            <MDTypography
              component="a"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                editButton(mm.id ?? index + 1);
              }}
              variant="caption"
              color="text"
              fontWeight="regular"
              sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
            >
              Editar
            </MDTypography>
            <MDTypography variant="caption" color="text">
              /
            </MDTypography>
            <MDTypography
              component="a"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                deleteButton(index);
              }}
              variant="caption"
              color="text"
              fontWeight="regular"
              sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
            >
              Excluir
            </MDTypography>
          </MDBox>
        ),
      };
    }),
    // rows: aresCondicionados.map((mm, index) => {
    //   const aparelhosPorSala = { A108: 3, 212: 1, A211: 4, A111: 2, A208: 5, A205: 6 };

    //   const diasPorSala = {
    //     A108: "Sex - Qua",
    //     212: "Qui - Sex",
    //     A211: "Seg - Sex",
    //     A111: "Ter - Qui",
    //     A208: "Seg - Qua",
    //     A205: "Sex",
    //   };

    //   const horariosLiga = {
    //     A108: "07:00",
    //     212: "13:00",
    //     A211: "07:30",
    //     A111: "08:00",
    //     A208: "14:00",
    //     A205: "07:00",
    //   };

    //   const horariosDesliga = {
    //     A108: "12:00",
    //     212: "18:00",
    //     A211: "11:30",
    //     A111: "17:00",
    //     A208: "22:00",
    //     A205: "13:00",
    //   };

    //   const quantidadeValida = Number(aparelhosPorSala[mm.codigo]) || 0;
    //   const diasFormatados = diasPorSala[mm.codigo] || "Não definido";
    //   const horaLiga = horariosLiga[mm.codigo] || "--:--";
    //   const horaDesliga = horariosDesliga[mm.codigo] || "--:--";

    //   return {
    //     // project: <Project image={LogoAr} name={mm.sala} />,
    //     // project: <MarcaModelo image={LogoAr} name={mm.sala} modelo={mm.marca} />,
    //     project: <Author image={LogoAr} name={mm.codigo} email={mm.sala} />,
    //     budget: `${quantidadeValida} ${quantidadeValida === 1 ? "aparelho" : "aparelhos"}`,
    //     completion: (
    //       // <Progress color="info" value={mm.temperatura.medicao - mm.temperatura.referencia} />
    //       // <Author name={mm.marca} email={mm.modelo} />
    //       <Job title={diasFormatados} description="" />
    //     ),
    //     status: <Status online={mm.atuadorVazio} />,
    //     // status: !mm.atuadorVazio ? (
    //     //   // <Tooltip title={"Clique para " + (mm.status == "ligado" ? "desligar" : "ligar")}>
    //     //   //   <IconButton
    //     //   //     onClick={() => {
    //     //   //       // console.log("Imagem clicada");
    //     //   //       triggerButton(mm.id, mm.status, mm.temperatura.referencia);
    //     //   //     }}
    //     //   //   >
    //     //   //     <img
    //     //   //       src={mm.status == "ligado" ? iconOnButton : iconOffButton}
    //     //   //       alt="status"
    //     //   //       width={45}
    //     //   //     />
    //     //   //   </IconButton>
    //     //   // </Tooltip>
    //     //   <Status online={mm.atuadorVazio} />
    //     // ) : (
    //     //   <Tooltip title="Endereço do atuador está vazio">
    //     //     <img src={iconArLock} alt="logo" width={45} />
    //     //   </Tooltip>
    //     // ),
    //     on: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {horaLiga}
    //       </MDTypography>
    //     ),
    //     off: (
    //       <MDTypography variant="caption" color="text" fontWeight="medium">
    //         {horaDesliga}
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MenuFlutuante
    //         deleteButton={() => deleteButton(index)}
    //         editButton={() => editButton(mm.id)}
    //       />
    //     ),
    //   };
    // }),
  };
}
