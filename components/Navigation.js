import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../utils/connectors';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuIcon from '@mui/icons-material/Menu';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Navigation = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const { active, account, activate, deactivate } = useWeb3React();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
              <LocalHospitalIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
                MediLedger
              </Typography>
            </Box>
          </Link>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Link href="/drugs" passHref>
              <Button
                color="primary"
                variant={router.pathname === '/drugs' ? 'contained' : 'text'}
              >
                Drug Traceability
              </Button>
            </Link>
            <Link href="/records" passHref>
              <Button
                color="primary"
                variant={router.pathname === '/records' ? 'contained' : 'text'}
              >
                Medical Records
              </Button>
            </Link>
            {active ? (
              <Chip
                icon={<AccountBalanceWalletIcon />}
                label={`${account.slice(0, 6)}...${account.slice(-4)}`}
                variant="outlined"
                color="primary"
                onClick={deactivate}
                sx={{ ml: 2 }}
              />
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => activate(injected)}
                startIcon={<AccountBalanceWalletIcon />}
              >
                Connect Wallet
              </Button>
            )}
          </Box>

          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={handleMenu}
            color="primary"
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { router.push('/drugs'); handleClose(); }}>
              Drug Traceability
            </MenuItem>
            <MenuItem onClick={() => { router.push('/records'); handleClose(); }}>
              Medical Records
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;