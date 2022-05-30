import { Icon } from '@iconify/react';
import windowsFilled from '@iconify/icons-ant-design/windows-filled';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  width: "220px",
  height: "220px",
  textAlign: 'center',
  padding: theme.spacing(4, 0),
  color: "white",
  backgroundColor: "#52ab56"
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: "70px",
  height: "70px",
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: "#52ab56",
  backgroundColor: "white",
}));

// ----------------------------------------------------------------------

const TOTAL = 1723315;

export default function AppItemOrders() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={windowsFilled} width={40} height={40} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2">
        ilots
      </Typography>
    </RootStyle>
  );
}
