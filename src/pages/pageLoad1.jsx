import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Box, Button, Typography, Container } from "@material-ui/core";
// components
import { MotionContainer, varBounceIn } from "../components/animate";
import Page from "../components/Page";
import "./PageLoad1.css";

// ----------------------------------------------------------------------

export default function PageLoad1() {
  return (
    <div id="cssLoader17" class="main-wrap main-wrap--white">
      <div class="cssLoader17"></div>
    </div>
  );
}
