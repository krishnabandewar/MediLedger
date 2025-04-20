// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DrugTraceability is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _drugIds;

    struct Drug {
        uint256 id;
        string name;
        string manufacturer;
        string batchNumber;
        uint256 manufacturingDate;
        uint256 expiryDate;
        string location;
        address owner;
        string status;
    }

    mapping(uint256 => Drug) private drugs;
    mapping(uint256 => address[]) private drugHistory;

    event DrugCreated(uint256 indexed id, string name, address owner);
    event DrugTransferred(uint256 indexed id, address from, address to);
    event DrugStatusUpdated(uint256 indexed id, string newStatus);

    function createDrug(
        string memory _name,
        string memory _manufacturer,
        string memory _batchNumber,
        uint256 _manufacturingDate,
        uint256 _expiryDate,
        string memory _location
    ) public returns (uint256) {
        _drugIds.increment();
        uint256 newDrugId = _drugIds.current();

        Drug memory newDrug = Drug({
            id: newDrugId,
            name: _name,
            manufacturer: _manufacturer,
            batchNumber: _batchNumber,
            manufacturingDate: _manufacturingDate,
            expiryDate: _expiryDate,
            location: _location,
            owner: msg.sender,
            status: "Manufactured"
        });

        drugs[newDrugId] = newDrug;
        drugHistory[newDrugId].push(msg.sender);

        emit DrugCreated(newDrugId, _name, msg.sender);
        return newDrugId;
    }

    function transferDrug(uint256 _drugId, address _to) public {
        require(drugs[_drugId].owner == msg.sender, "Not the owner");
        require(_to != address(0), "Invalid recipient address");

        drugs[_drugId].owner = _to;
        drugHistory[_drugId].push(_to);

        emit DrugTransferred(_drugId, msg.sender, _to);
    }

    function updateDrugStatus(uint256 _drugId, string memory _newStatus) public {
        require(drugs[_drugId].owner == msg.sender, "Not the owner");
        drugs[_drugId].status = _newStatus;
        emit DrugStatusUpdated(_drugId, _newStatus);
    }

    function getDrugDetails(uint256 _drugId) public view returns (
        uint256 id,
        string memory name,
        string memory manufacturer,
        string memory batchNumber,
        uint256 manufacturingDate,
        uint256 expiryDate,
        string memory location,
        address owner,
        string memory status
    ) {
        Drug memory drug = drugs[_drugId];
        return (
            drug.id,
            drug.name,
            drug.manufacturer,
            drug.batchNumber,
            drug.manufacturingDate,
            drug.expiryDate,
            drug.location,
            drug.owner,
            drug.status
        );
    }

    function getDrugHistory(uint256 _drugId) public view returns (address[] memory) {
        return drugHistory[_drugId];
    }
} 