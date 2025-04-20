const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy DrugTraceability contract
  const DrugTraceability = await hre.ethers.getContractFactory("DrugTraceability");
  const drugTraceability = await DrugTraceability.deploy();
  await drugTraceability.deployed();
  console.log("DrugTraceability deployed to:", drugTraceability.address);

  // Deploy MedicalRecord contract
  const MedicalRecord = await hre.ethers.getContractFactory("MedicalRecord");
  const medicalRecord = await MedicalRecord.deploy();
  await medicalRecord.deployed();
  console.log("MedicalRecord deployed to:", medicalRecord.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 