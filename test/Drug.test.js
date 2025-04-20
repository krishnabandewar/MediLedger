const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DrugTraceability", function () {
  let DrugTraceability;
  let drugTraceability;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    DrugTraceability = await ethers.getContractFactory("DrugTraceability");
    drugTraceability = await DrugTraceability.deploy();
    await drugTraceability.deployed();
  });

  describe("Drug Creation", function () {
    it("Should create a new drug", async function () {
      const tx = await drugTraceability.createDrug(
        "Test Drug",
        "Test Manufacturer",
        "BATCH001",
        Math.floor(Date.now() / 1000),
        Math.floor(Date.now() / 1000) + 31536000, // 1 year from now
        "Test Location"
      );

      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "DrugCreated");
      
      expect(event).to.not.be.undefined;
      expect(event.args.id).to.equal(1);
      expect(event.args.name).to.equal("Test Drug");
      expect(event.args.owner).to.equal(owner.address);
    });

    it("Should get drug details", async function () {
      await drugTraceability.createDrug(
        "Test Drug",
        "Test Manufacturer",
        "BATCH001",
        Math.floor(Date.now() / 1000),
        Math.floor(Date.now() / 1000) + 31536000,
        "Test Location"
      );

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
      ] = await drugTraceability.getDrugDetails(1);

      expect(id).to.equal(1);
      expect(name).to.equal("Test Drug");
      expect(manufacturer).to.equal("Test Manufacturer");
      expect(batchNumber).to.equal("BATCH001");
      expect(status).to.equal("Manufactured");
    });
  });

  describe("Drug Transfer", function () {
    it("Should transfer drug ownership", async function () {
      await drugTraceability.createDrug(
        "Test Drug",
        "Test Manufacturer",
        "BATCH001",
        Math.floor(Date.now() / 1000),
        Math.floor(Date.now() / 1000) + 31536000,
        "Test Location"
      );

      const tx = await drugTraceability.transferDrug(1, addr1.address);
      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "DrugTransferred");

      expect(event).to.not.be.undefined;
      expect(event.args.id).to.equal(1);
      expect(event.args.from).to.equal(owner.address);
      expect(event.args.to).to.equal(addr1.address);

      const [, , , , , , , newOwner] = await drugTraceability.getDrugDetails(1);
      expect(newOwner).to.equal(addr1.address);
    });

    it("Should not allow non-owner to transfer drug", async function () {
      await drugTraceability.createDrug(
        "Test Drug",
        "Test Manufacturer",
        "BATCH001",
        Math.floor(Date.now() / 1000),
        Math.floor(Date.now() / 1000) + 31536000,
        "Test Location"
      );

      await expect(
        drugTraceability.connect(addr1).transferDrug(1, addr2.address)
      ).to.be.revertedWith("Not the owner");
    });
  });

  describe("Drug History", function () {
    it("Should track drug ownership history", async function () {
      await drugTraceability.createDrug(
        "Test Drug",
        "Test Manufacturer",
        "BATCH001",
        Math.floor(Date.now() / 1000),
        Math.floor(Date.now() / 1000) + 31536000,
        "Test Location"
      );

      await drugTraceability.transferDrug(1, addr1.address);
      await drugTraceability.connect(addr1).transferDrug(1, addr2.address);

      const history = await drugTraceability.getDrugHistory(1);
      expect(history).to.have.lengthOf(3);
      expect(history[0]).to.equal(owner.address);
      expect(history[1]).to.equal(addr1.address);
      expect(history[2]).to.equal(addr2.address);
    });
  });

  describe("Drug Status", function () {
    it("Should update drug status", async function () {
      await drugTraceability.createDrug(
        "Test Drug",
        "Test Manufacturer",
        "BATCH001",
        Math.floor(Date.now() / 1000),
        Math.floor(Date.now() / 1000) + 31536000,
        "Test Location"
      );

      const tx = await drugTraceability.updateDrugStatus(1, "In Transit");
      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "DrugStatusUpdated");

      expect(event).to.not.be.undefined;
      expect(event.args.id).to.equal(1);
      expect(event.args.newStatus).to.equal("In Transit");

      const [, , , , , , , , status] = await drugTraceability.getDrugDetails(1);
      expect(status).to.equal("In Transit");
    });

    it("Should not allow non-owner to update status", async function () {
      await drugTraceability.createDrug(
        "Test Drug",
        "Test Manufacturer",
        "BATCH001",
        Math.floor(Date.now() / 1000),
        Math.floor(Date.now() / 1000) + 31536000,
        "Test Location"
      );

      await expect(
        drugTraceability.connect(addr1).updateDrugStatus(1, "In Transit")
      ).to.be.revertedWith("Not the owner");
    });
  });
}); 