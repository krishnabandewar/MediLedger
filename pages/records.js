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
import MedicalRecordABI from '../artifacts/contracts/MedicalRecord.sol/MedicalRecord.json';

const MEDICAL_RECORD_ADDRESS = process.env.NEXT_PUBLIC_MEDICAL_RECORD_ADDRESS;

export default function Records() {
  const { account, library } = useWeb3React();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newRecord, setNewRecord] = useState({
    patientName: '',
    diagnosis: '',
    treatment: '',
    medications: '',
    notes: '',
  });

  useEffect(() => {
    if (account && library) {
      loadRecords();
    }
  }, [account, library]);

  const loadRecords = async () => {
    try {
      const contract = await getContract(MEDICAL_RECORD_ADDRESS, MedicalRecordABI.abi, library);
      const recordIds = await contract.getPatientRecords(account);
      const records = [];

      for (const recordId of recordIds) {
        try {
          const [
            id,
            patientName,
            diagnosis,
            treatment,
            medications,
            notes,
            createdAt,
            createdBy
          ] = await contract.getRecordDetails(recordId);

          records.push({
            id: id.toNumber(),
            patientName,
            diagnosis,
            treatment,
            medications,
            notes,
            creator: createdBy,
            timestamp: createdAt.toNumber(),
          });
        } catch (error) {
          console.error(`Error loading record ${recordId}:`, error);
          continue;
        }
      }

      setRecords(records);
    } catch (error) {
      console.error('Error loading records:', error);
      setError('Failed to load medical records');
    }
  };

  const handleCreateRecord = async (e) => {
    e.preventDefault();
    if (!account || !library) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const contract = await getContract(MEDICAL_RECORD_ADDRESS, MedicalRecordABI.abi, library);
      const tx = await contract.createRecord(
        account,
        newRecord.patientName,
        newRecord.diagnosis,
        newRecord.treatment,
        newRecord.medications,
        newRecord.notes
      );
      await tx.wait();

      // Reset form
      setNewRecord({
        patientName: '',
        diagnosis: '',
        treatment: '',
        medications: '',
        notes: '',
      });

      // Reload records
      await loadRecords();
    } catch (error) {
      console.error('Error creating medical record:', error);
      setError(error.message || 'Failed to create medical record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Medical Records Management
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Create Record Form */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create New Medical Record
        </Typography>
        <form onSubmit={handleCreateRecord}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                value={newRecord.patientName}
                onChange={(e) => setNewRecord({ ...newRecord, patientName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Diagnosis"
                value={newRecord.diagnosis}
                onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Treatment"
                value={newRecord.treatment}
                onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medications"
                value={newRecord.medications}
                onChange={(e) => setNewRecord({ ...newRecord, medications: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes"
                value={newRecord.notes}
                onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                multiline
                rows={3}
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
                {loading ? 'Creating...' : 'Create Record'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Records List */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Medical Records
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Diagnosis</TableCell>
                <TableCell>Treatment</TableCell>
                <TableCell>Medications</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.id}</TableCell>
                    <TableCell>{record.patientName}</TableCell>
                    <TableCell>{record.diagnosis}</TableCell>
                    <TableCell>{record.treatment}</TableCell>
                    <TableCell>{record.medications}</TableCell>
                    <TableCell>{formatAddress(record.creator)}</TableCell>
                    <TableCell>{new Date(record.timestamp * 1000).toLocaleDateString()}</TableCell>
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