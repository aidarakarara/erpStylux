import { Icon } from "@iconify/react";
import windowsFilled from "@iconify/icons-ant-design/windows-filled";
// material
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  height: "auto",
  textAlign: "center",
  padding: "10px",
  margin: "10px",
  color: "white",
  backgroundColor: "#52ab56",
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: "70px",
  height: "70px",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: "#52ab56",
  backgroundColor: "white",
}));

// ----------------------------------------------------------------------

const TOTAL = 1723315;

export default function AppItemOrders({
  bgcolor,
  titre,
  color,
  ombre,
  licone,
  nombre,
}) {
  return (
    <RootStyle style={{ background: `${bgcolor}`, boxShadow: `${ombre}`	 }}>
      <IconWrapperStyle
        style={{
          background: `${color}`,
          boxShadow: `${ombre}`,
        }}
      >
        <img src={licone} width="40%" />
      </IconWrapperStyle>
      <Typography style={{ fontSize: 22, fontWeight:"bold"}}>{nombre}</Typography>
      <Typography style={{ fontSize: 22, fontWeight:"200"}} variant="subtitle2">{titre}</Typography>
    </RootStyle>
  );
}
