import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { getContract, formatAddress } from '../utils/web3';
import DrugTraceabilityABI from '../artifacts/contracts/DrugTraceability.sol/DrugTraceability.json';

const DRUG_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DRUG_TRACEABILITY_ADDRESS;

export default function Drugs() {
  const { account, library } = useWeb3React();
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newDrug, setNewDrug] = useState({
    name: '',
    manufacturer: '',
    batchNumber: '',
    manufacturingDate: '',
    expiryDate: '',
    location: '',
  });

  useEffect(() => {
    if (account && library) {
      loadDrugs();
    }
  }, [account, library]);

  const loadDrugs = async () => {
    try {
      const contract = await getContract(DRUG_CONTRACT_ADDRESS, DrugTraceabilityABI.abi, library);
      const drugs = [];
      let drugId = 1;

      while (true) {
        try {
          const [
            id,
            name,
            manufacturer,
            batchNumber,
            manufacturingDate,
            expiryDate,
            location,
            owner,
            status
          ] = await contract.getDrugDetails(drugId);

          if (id.toNumber() === 0) break; // No more drugs

          drugs.push({
            id: id.toNumber(),
            name,
            manufacturer,
            batchNumber,
            manufacturingDate: new Date(manufacturingDate.toNumber() * 1000).toLocaleDateString(),
            expiryDate: new Date(expiryDate.toNumber() * 1000).toLocaleDateString(),
            location,
            owner,
            status
          });

          drugId++;
        } catch (error) {
          // If we get an error, we've reached the end of the list
          break;
        }
      }

      setDrugs(drugs);
    } catch (error) {
      console.error('Error loading drugs:', error);
      setError('Failed to load drugs');
    }
  };

  const handleCreateDrug = async (e) => {
    e.preventDefault();
    if (!account || !library) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const contract = await getContract(DRUG_CONTRACT_ADDRESS, DrugTraceabilityABI.abi, library);
      
      // Convert dates to Unix timestamps
      const manufacturingDate = Math.floor(new Date(newDrug.manufacturingDate).getTime() / 1000);
      const expiryDate = Math.floor(new Date(newDrug.expiryDate).getTime() / 1000);

      const tx = await contract.createDrug(
        newDrug.name,
        newDrug.manufacturer,
        newDrug.batchNumber,
        manufacturingDate,
        expiryDate,
        newDrug.location
      );

      await tx.wait();

      // Reset form
      setNewDrug({
        name: '',
        manufacturer: '',
        batchNumber: '',
        manufacturingDate: '',
        expiryDate: '',
        location: '',
      });

      // Reload drugs
      await loadDrugs();
    } catch (error) {
      console.error('Error creating drug:', error);
      setError(error.message || 'Failed to create drug');
    } finally {
      setLoading(false);
    }
  };

  const handleTransferDrug = async (drugId, toAddress) => {
    if (!account || !library) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const contract = await getContract(DRUG_CONTRACT_ADDRESS, DrugTraceabilityABI.abi, library);
      const tx = await contract.transferDrug(drugId, toAddress);
      await tx.wait();
      await loadDrugs();
    } catch (error) {
      console.error('Error transferring drug:', error);
      setError(error.message || 'Failed to transfer drug');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Drug Management
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Create Drug Form */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create New Drug
        </Typography>
        <form onSubmit={handleCreateDrug}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Drug Name"
                value={newDrug.name}
                onChange={(e) => setNewDrug({ ...newDrug, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Manufacturer"
                value={newDrug.manufacturer}
                onChange={(e) => setNewDrug({ ...newDrug, manufacturer: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Batch Number"
                value={newDrug.batchNumber}
                onChange={(e) => setNewDrug({ ...newDrug, batchNumber: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Manufacturing Date"
                value={newDrug.manufacturingDate}
                onChange={(e) => setNewDrug({ ...newDrug, manufacturingDate: e.target.value })}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Expiry Date"
                value={newDrug.expiryDate}
                onChange={(e) => setNewDrug({ ...newDrug, expiryDate: e.target.value })}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={newDrug.location}
                onChange={(e) => setNewDrug({ ...newDrug, location: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading || !account}
                sx={{ mt: 2 }}
              >
                {loading ? 'Creating...' : 'Create Drug'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Drug List */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Drug Inventory
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drugs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No drugs found
                  </TableCell>
                </TableRow>
              ) : (
                drugs.map((drug) => (
                  <TableRow key={drug.id}>
                    <TableCell>{drug.id}</TableCell>
                    <TableCell>{drug.name}</TableCell>
                    <TableCell>{drug.status}</TableCell>
                    <TableCell>{formatAddress(drug.owner)}</TableCell>
                    <TableCell>
                      {drug.owner === account && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            const toAddress = prompt('Enter recipient address:');
                            if (toAddress) {
                              handleTransferDrug(drug.id, toAddress);
                            }
                          }}
                          disabled={loading}
                        >
                          Transfer
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
} 