import { Icon } from "@iconify/react";
import { useRef, useState, useEffect } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import { alpha } from "@material-ui/core/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@material-ui/core";
// components
import MenuPopover from "../../components/MenuPopover";
//
import account from "../../_mocks_/account";
import api from "src/api/api";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState({});
  useEffect(() => {
    api.get("api/user").then((res) => {
      setAccount(res.data);
    });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    api.get("sanctum/csrf-cookie").then((response) => {
      api.post("api/logout").then((res) => {
        localStorage.removeItem("user-token");
        navigate("/login");
      });
    });
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: "#FFD509",
            },
          }),
        }}
      >
        <Avatar src="/static/dashobordIcon.svg" alt={account.name} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: "280px" }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {account.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account.email}
          </Typography>
        </Box>
        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            className="btn btn-secondary"
            fullWidth
            onClick={() => navigate("updatePassword")}
            variant="outlined"
            sx={{ color: "text.secondary" }}
            style={{ marginBottom: "10px", textTransform: "none" }}
          >
            Modifiez le mot de passe
          </Button>
          <Button
            fullWidth
            style={{
              backgroundColor: "#ED1C24",
              color: "white",
              borderColor: "white",
            }}
            variant="outlined"
            onClick={handleLogOut}
          >
            Déconnexion
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
