// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MedicalRecord is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _recordIds;

    struct Record {
        uint256 id;
        address patient;
        string patientName;
        string diagnosis;
        string treatment;
        string medications;
        string notes;
        uint256 createdAt;
        address createdBy;
    }

    struct AccessRequest {
        address requester;
        bool granted;
        uint256 timestamp;
    }

    mapping(uint256 => Record) private records;
    mapping(address => uint256[]) private patientRecords;
    mapping(uint256 => mapping(address => bool)) private recordAccess;
    mapping(uint256 => AccessRequest[]) private accessRequests;

    event RecordCreated(uint256 indexed id, address patient, string patientName);
    event AccessRequested(uint256 indexed id, address requester);
    event AccessGranted(uint256 indexed id, address requester);
    event AccessRevoked(uint256 indexed id, address user);

    function createRecord(
        address _patient,
        string memory _patientName,
        string memory _diagnosis,
        string memory _treatment,
        string memory _medications,
        string memory _notes
    ) public returns (uint256) {
        _recordIds.increment();
        uint256 newRecordId = _recordIds.current();

        Record memory newRecord = Record({
            id: newRecordId,
            patient: _patient,
            patientName: _patientName,
            diagnosis: _diagnosis,
            treatment: _treatment,
            medications: _medications,
            notes: _notes,
            createdAt: block.timestamp,
            createdBy: msg.sender
        });

        records[newRecordId] = newRecord;
        patientRecords[_patient].push(newRecordId);
        recordAccess[newRecordId][_patient] = true;
        recordAccess[newRecordId][msg.sender] = true;

        emit RecordCreated(newRecordId, _patient, _patientName);
        return newRecordId;
    }

    function requestAccess(uint256 _recordId) public {
        require(records[_recordId].patient != address(0), "Record does not exist");
        require(!recordAccess[_recordId][msg.sender], "Already has access");

        AccessRequest memory request = AccessRequest({
            requester: msg.sender,
            granted: false,
            timestamp: block.timestamp
        });

        accessRequests[_recordId].push(request);
        emit AccessRequested(_recordId, msg.sender);
    }

    function grantAccess(uint256 _recordId, address _requester) public {
        require(
            records[_recordId].patient == msg.sender || msg.sender == owner(),
            "Not authorized to grant access"
        );
        
        recordAccess[_recordId][_requester] = true;
        
        // Update the access request status
        for (uint256 i = 0; i < accessRequests[_recordId].length; i++) {
            if (accessRequests[_recordId][i].requester == _requester) {
                accessRequests[_recordId][i].granted = true;
                break;
            }
        }

        emit AccessGranted(_recordId, _requester);
    }

    function revokeAccess(uint256 _recordId, address _user) public {
        require(
            records[_recordId].patient == msg.sender || msg.sender == owner(),
            "Not authorized to revoke access"
        );
        require(_user != records[_recordId].patient, "Cannot revoke patient's access");

        recordAccess[_recordId][_user] = false;
        emit AccessRevoked(_recordId, _user);
    }

    function getRecordDetails(uint256 _recordId) public view returns (
        uint256 id,
        string memory patientName,
        string memory diagnosis,
        string memory treatment,
        string memory medications,
        string memory notes,
        uint256 createdAt,
        address createdBy
    ) {
        require(recordAccess[_recordId][msg.sender], "No access to this record");
        
        Record memory record = records[_recordId];
        return (
            record.id,
            record.patientName,
            record.diagnosis,
            record.treatment,
            record.medications,
            record.notes,
            record.createdAt,
            record.createdBy
        );
    }

    function getPatientRecords(address _patient) public view returns (uint256[] memory) {
        require(
            _patient == msg.sender || recordAccess[patientRecords[_patient][0]][msg.sender],
            "No access to these records"
        );
        return patientRecords[_patient];
    }

    function hasAccess(uint256 _recordId, address _user) public view returns (bool) {
        return recordAccess[_recordId][_user];
    }
} 