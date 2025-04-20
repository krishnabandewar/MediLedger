const fs = require('fs');
const path = require('path');

// Source directory (Hardhat artifacts)
const artifactsDir = path.join(__dirname, '../artifacts/contracts');

// Destination directory
const destDir = path.join(__dirname, '../contracts/artifacts');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy DrugTraceability.json
const drugTraceabilitySource = path.join(artifactsDir, 'DrugTraceability.sol/DrugTraceability.json');
const drugTraceabilityDest = path.join(destDir, 'DrugTraceability.json');
fs.copyFileSync(drugTraceabilitySource, drugTraceabilityDest);
console.log('Copied DrugTraceability.json');

// Copy MedicalRecord.json
const medicalRecordSource = path.join(artifactsDir, 'MedicalRecord.sol/MedicalRecord.json');
const medicalRecordDest = path.join(destDir, 'MedicalRecord.json');
fs.copyFileSync(medicalRecordSource, medicalRecordDest);
console.log('Copied MedicalRecord.json'); 