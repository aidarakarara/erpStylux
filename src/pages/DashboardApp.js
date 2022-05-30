import React, { useState, useEffect } from "react";
// material
import { Box, Grid, Container, Typography } from "@material-ui/core";
import pompe from "../components/DashAdminSvg/pompe.svg";
import cuves from "../components/DashAdminSvg/cuveIcon.svg";
import pistolet from "../components/DashAdminSvg/pistoletIcon.svg";
import ilot from "../components/DashAdminSvg/ilot.svg";
// components
import Page from "../components/Page";
import { AppBugReports } from "../components/_dashboard/app";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import api from "src/api/api";
import Loader from "src/components/loader";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [infosAdmin, setInfosAdmin] = useState(null);
  useEffect(() => {
    api.get("api/admin").then((res) => setInfosAdmin(res.data));
  }, []);

  if (!infosAdmin) {
    return <Loader />;
  }
  return (
    <Page title="Tableau de bord - Admin">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/admin/ilots">
              <AppBugReports
                bgcolor="linear-gradient(60deg, #5d5357, #2c2e20)"
                nombre={infosAdmin && infosAdmin.nbIlot}
                licone={ilot}
                titre="Ilots"
                color="white"
                ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(108 120 132 / 60%)"
              />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/admin/pompes">
              <AppBugReports
                bgcolor="linear-gradient(60deg, #66bb6a, #43a047)"
                nombre={infosAdmin && infosAdmin.nbPompe}
                licone={pompe}
                titre="Pompes"
                color="white"
                ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 172 193 / 60%)"
              />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/admin/pistolets">
              <AppBugReports
                bgcolor="linear-gradient(60deg, #ffa726, #fb8c00)"
                nombre={infosAdmin && infosAdmin.nbPistolet}
                licone={pistolet}
                titre="Pistolets"
                color="white"
                ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 152 0 / 60%)"
              />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/admin/cuves">
              <AppBugReports
                bgcolor="linear-gradient(60deg, #ef5350, #e53935)"
                nombre={infosAdmin && infosAdmin.nbCuve}
                licone={cuves}
                titre="Cuves"
                color="white"
                ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(156 39 176 / 60%)"
              />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
