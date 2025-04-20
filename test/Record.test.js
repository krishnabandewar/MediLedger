const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MedicalRecord", function () {
  let MedicalRecord;
  let medicalRecord;
  let owner;
  let patient;
  let doctor;
  let other;

  beforeEach(async function () {
    [owner, patient, doctor, other] = await ethers.getSigners();

    MedicalRecord = await ethers.getContractFactory("MedicalRecord");
    medicalRecord = await MedicalRecord.deploy();
    await medicalRecord.deployed();
  });

  describe("Record Creation", function () {
    it("Should create a new medical record", async function () {
      const ipfsHash = "QmTestHash";
      const tx = await medicalRecord.createRecord(patient.address, ipfsHash);
      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "RecordCreated");

      expect(event).to.not.be.undefined;
      expect(event.args.id).to.equal(1);
      expect(event.args.patient).to.equal(patient.address);
      expect(event.args.ipfsHash).to.equal(ipfsHash);
    });

    it("Should get record details", async function () {
      const ipfsHash = "QmTestHash";
      await medicalRecord.createRecord(patient.address, ipfsHash);

      const [
        id,
        recordPatient,
        recordIpfsHash,
        createdAt,
        createdBy
      ] = await medicalRecord.getRecordDetails(1);

      expect(id).to.equal(1);
      expect(recordPatient).to.equal(patient.address);
      expect(recordIpfsHash).to.equal(ipfsHash);
      expect(createdBy).to.equal(owner.address);
    });
  });

  describe("Access Control", function () {
    it("Should allow patient to access their own record", async function () {
      const ipfsHash = "QmTestHash";
      await medicalRecord.createRecord(patient.address, ipfsHash);

      const [, , , , createdBy] = await medicalRecord.connect(patient).getRecordDetails(1);
      expect(createdBy).to.equal(owner.address);
    });

    it("Should not allow unauthorized access", async function () {
      const ipfsHash = "QmTestHash";
      await medicalRecord.createRecord(patient.address, ipfsHash);

      await expect(
        medicalRecord.connect(other).getRecordDetails(1)
      ).to.be.revertedWith("No access to this record");
    });
  });

  describe("Access Requests", function () {
    it("Should handle access request and grant", async function () {
      const ipfsHash = "QmTestHash";
      await medicalRecord.createRecord(patient.address, ipfsHash);

      // Request access
      const requestTx = await medicalRecord.connect(doctor).requestAccess(1);
      const requestReceipt = await requestTx.wait();
      const requestEvent = requestReceipt.events.find(e => e.event === "AccessRequested");

      expect(requestEvent).to.not.be.undefined;
      expect(requestEvent.args.id).to.equal(1);
      expect(requestEvent.args.requester).to.equal(doctor.address);

      // Grant access
      const grantTx = await medicalRecord.connect(patient).grantAccess(1, doctor.address);
      const grantReceipt = await grantTx.wait();
      const grantEvent = grantReceipt.events.find(e => e.event === "AccessGranted");

      expect(grantEvent).to.not.be.undefined;
      expect(grantEvent.args.id).to.equal(1);
      expect(grantEvent.args.requester).to.equal(doctor.address);

      // Verify access
      const hasAccess = await medicalRecord.hasAccess(1, doctor.address);
      expect(hasAccess).to.be.true;
    });

    it("Should not allow non-patient to grant access", async function () {
      const ipfsHash = "QmTestHash";
      await medicalRecord.createRecord(patient.address, ipfsHash);

      await expect(
        medicalRecord.connect(other).grantAccess(1, doctor.address)
      ).to.be.revertedWith("Not authorized to grant access");
    });
  });

  describe("Access Revocation", function () {
    it("Should revoke access", async function () {
      const ipfsHash = "QmTestHash";
      await medicalRecord.createRecord(patient.address, ipfsHash);

      // Grant access
      await medicalRecord.connect(patient).grantAccess(1, doctor.address);

      // Revoke access
      const revokeTx = await medicalRecord.connect(patient).revokeAccess(1, doctor.address);
      const revokeReceipt = await revokeTx.wait();
      const revokeEvent = revokeReceipt.events.find(e => e.event === "AccessRevoked");

      expect(revokeEvent).to.not.be.undefined;
      expect(revokeEvent.args.id).to.equal(1);
      expect(revokeEvent.args.user).to.equal(doctor.address);

      // Verify access revoked
      const hasAccess = await medicalRecord.hasAccess(1, doctor.address);
      expect(hasAccess).to.be.false;
    });

    it("Should not allow non-patient to revoke access", async function () {
      const ipfsHash = "QmTestHash";
      await medicalRecord.createRecord(patient.address, ipfsHash);

      await medicalRecord.connect(patient).grantAccess(1, doctor.address);

      await expect(
        medicalRecord.connect(other).revokeAccess(1, doctor.address)
      ).to.be.revertedWith("Not authorized to revoke access");
    });

    it("Should not allow revoking patient's access", async function () {
      const ipfsHash = "QmTestHash";
      await medicalRecord.createRecord(patient.address, ipfsHash);

      await expect(
        medicalRecord.connect(patient).revokeAccess(1, patient.address)
      ).to.be.revertedWith("Cannot revoke patient's access");
    });
  });

  describe("Patient Records", function () {
    it("Should get all records for a patient", async function () {
      const ipfsHash1 = "QmTestHash1";
      const ipfsHash2 = "QmTestHash2";

      await medicalRecord.createRecord(patient.address, ipfsHash1);
      await medicalRecord.createRecord(patient.address, ipfsHash2);

      const records = await medicalRecord.getPatientRecords(patient.address);
      expect(records).to.have.lengthOf(2);
      expect(records[0]).to.equal(1);
      expect(records[1]).to.equal(2);
    });

    it("Should not allow unauthorized access to patient records", async function () {
      const ipfsHash = "QmTestHash";
      await medicalRecord.createRecord(patient.address, ipfsHash);

      await expect(
        medicalRecord.connect(other).getPatientRecords(patient.address)
      ).to.be.revertedWith("No access to these records");
    });
  });
}); 