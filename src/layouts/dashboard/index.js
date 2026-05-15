/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { ReactComponent as Planta } from "assets/planta_p1.svg";
import PlantaArCondicionado from "layouts/dashboard/components/PlantaArCondicionado";

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

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

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const {state, setState} = useState();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <PlantaArCondicionado
          rooms={{
            sala01: { acState: ["on"], tempC: 23.4 },
            sala02: { acState: ["off", "on", "on"], tempC: 27.1 },
            sala03: { acState: ["unmanaged"], tempC: null },
            sala04: { acState: ["on", "on"], tempC: 23.4 },
            sala05: { acState: ["off"], tempC: 27.1 },
            sala06: { acState: ["on"], tempC: 22.37 },
            sala07: { acState: ["off"], tempC: 27.1 },
            sala08: { acState: ["unmanaged"], tempC: null },
            sala09: { acState: ["on", "on", "off"], tempC: 32.37 },
            sala17: { acState: ["on"], tempC: 17.8 },
            sala18: { acState: ["on"], tempC: 17.8 },
            sala20: { acState: ["on"], tempC: 17.8 },
            sala23: { acState: ["off"], tempC: 27.1 },
          }}
          onRoomClick={(id, data) => {
            console.log("Sala clicada:", id, data);
          }}
        />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
