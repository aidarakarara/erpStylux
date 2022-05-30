import PropTypes from "prop-types";
// material
import { Box } from "@material-ui/core";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
    <Box
      style={{ flex: 1, }}
      component="img"
      src="/images/logo.png"
      sx={{ width: 60, height: 60, ...sx }}
    />
  );
}
