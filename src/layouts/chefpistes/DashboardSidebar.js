import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@material-ui/core";
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
import { MHidden } from "../../components/@material-extend";
//
import { useNavigate } from "react-router-dom";
import sidebarConfig from "./SidebarConfig";
import Calendar from "react-calendar";

import api from "src/api/api";
import "./m.css";
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [account, setAccount] = useState({});
  useEffect(() => {
    api.get("api/user").then((res) => {
      setAccount(res.data);
    });
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function handleRedirect(date) {
    let myDate = new Date(date);

    myDate = `${myDate.getFullYear()}-${
      myDate.getMonth() + 1
    }-${myDate.getDate()}`;
    navigate(`journee/${myDate}`);
  }

  const renderContent = (
    <Scrollbar
      style={{
        backgroundImage: "url(/images/img3.jpeg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0,0,0,0.5)",
        backgroundBlendMode: "darken",
      }}
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box
          component={RouterLink}
          to="/chefpistes/app"
          sx={{ display: "inline-flex" }}
        >
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.name} alt={account.name} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {account.name}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} />

      {/*-------------- CALENDRIER -------- */}
      <Box sx={{ mt: 1, mx: 1 }}>
        <Calendar
        
          style={{ height: "150px" }}
          
          onChange={(e) => {
            handleRedirect(e);
          }}
          // value={value}
        />
      </Box>
      {/*-------------- END CALENDRIER -------- */}

      <Box sx={{ flexGrow: 1 }} />

     {/*  <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{
            p: 2.5,
            pt: 5,
            borderRadius: 2,
            position: "relative",
            bgcolor: "grey.200",
          }}
        ></Stack>
      </Box> */}
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
