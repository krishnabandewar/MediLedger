# MediLedger

A blockchain-based healthcare system for secure drug traceability and medical record management.

## Features

- **Drug Traceability**: Track pharmaceutical products throughout their lifecycle
- **Medical Records**: Secure storage and access control for patient records
- **Role-Based Access**: Granular permissions for different stakeholders
- **IPFS Integration**: Decentralized storage for medical records
- **Dark/Light Theme**: Modern UI with theme support
- **Responsive Design**: Works on all device sizes

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Web3React, ethers.js
- **Backend**: Hardhat, OpenZeppelin, IPFS
- **Network**: Ethereum Sepolia Testnet

## Smart Contracts

### DrugTraceability.sol
- Create and manage drug information
- Track drug ownership and transfers
- View drug history and status

### MedicalRecord.sol
- Store medical records on IPFS
- Manage access control
- Handle access requests

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MetaMask wallet
- Sepolia testnet ETH
- IPFS node (or Infura IPFS)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mediledger.git
cd mediledger
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
SEPOLIA_RPC_URL=your_sepolia_rpc_url
PRIVATE_KEY=your_private_key
NEXT_PUBLIC_INFURA_PROJECT_ID=your_infura_project_id
NEXT_PUBLIC_INFURA_PROJECT_SECRET=your_infura_project_secret
```

4. Compile and deploy smart contracts:
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
mediledger/
├── contracts/              # Smart contracts
│   ├── DrugTraceability.sol
│   └── MedicalRecord.sol
├── frontend/              # Next.js frontend
│   ├── components/        # React components
│   ├── pages/            # Next.js pages
│   └── utils/            # Utility functions
├── scripts/              # Deployment scripts
├── test/                 # Smart contract tests
└── README.md
```

## Usage

1. Connect your MetaMask wallet to the Sepolia testnet
2. Create a profile and select your role
3. Use the dashboard to:
   - Create and track drugs
   - Upload and manage medical records
   - Handle access requests
   - View transaction history

## Security Features

- Access control mechanisms
- Data encryption
- Input validation
- Error handling
- Secure IPFS storage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenZeppelin for secure smart contract templates
- IPFS for decentralized storage
- Ethereum Foundation for the Sepolia testnet 