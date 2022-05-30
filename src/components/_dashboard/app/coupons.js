import { Icon } from "@iconify/react";
import upload from "@iconify/icons-ant-design/alibaba";
// material
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import { Card, Typography, Container } from "@material-ui/core";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
import pistoletIcon from "src/components/pistoletIcon.svg";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "0px 0px 5px 3px #D9D8D8",
  width: "98%",
  height: "110px",
  textAlign: "right",
  color: "red",
  background: "white",
  position: "relative",
  overflow: "initial",
  marginTop: "35px",
  borderRadius: "5px",
}));

const IconWrapperStyle = styled(Card)(({ theme }) => ({
  display: "flex",
  borderRadius: "5px",
  alignItems: "center",
  width: "90px",
  height: "90px",
  justifyContent: "center",
  color: "white",
  //backgroundColor: "#FC9208",
  marginLeft: "15px",
  position: "absolute",
  top: "-25px",
}));

// ----------------------------------------------------------------------

const TOTAL = 1723315;

export default function AppItemOrders({ color, title, licon, chiffre, ombre }) {
  return (
    <Container>
      <RootStyle>
        <IconWrapperStyle
          style={{
            background: `${color}`,
            boxShadow: `${ombre}`,
            width: "30%"
          }}
        >
          <img src={licon} width="50%" />
        </IconWrapperStyle>
        <Typography
          style={{
            fontSize: 15,
            color: "black",
            marginRight: "13px",
            marginTop: "13px",
          }}
        >
          {chiffre} FCFA
        </Typography>
        <Typography style={{ color: "gray", marginRight: "13px" }}>
          {title}
        </Typography>
      </RootStyle>
    </Container>
  );
}
