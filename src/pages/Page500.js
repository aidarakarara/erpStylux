import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Box, Button, Typography, Container } from "@material-ui/core";
// components
import { MotionContainer, varBounceIn } from "../components/animate";
import Page from "../components/Page";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <RootStyle title="| 500 Page Erreur interne |">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <motion.div variants={varBounceIn}></motion.div>
            <h2>Oups ! Quelque chose s'est mal passé</h2>

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/illustration_500.svg"
                sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
              />
            </motion.div>

            <Button
              to="/"
              size="large"
              variant="contained"
              component={RouterLink}
            >
              Aller à l'accueil.
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
