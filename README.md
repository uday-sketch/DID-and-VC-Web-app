# Decentralized Identity and Verifiable Credentials System

This project implements a decentralized identity system using DIDs (Decentralized Identifiers) and VCs (Verifiable Credentials) following W3C standards.

## Features

- Create and manage Decentralized Identifiers (DIDs)
- Issue Verifiable Credentials with cryptographic proofs
- Verify credentials using public key cryptography
- View DID Documents
- Support for both simple and advanced credential formats

## Technology Stack

- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Sequelize ORM
- **Cryptography**: Node.js crypto module (RSA key pairs)
- **Frontend**: HTML, CSS, JavaScript

## Prerequisites

- Node.js (12+ recommended)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Configure your database in `src/models/index.js`:
```javascript
const sequelize = new Sequelize('postgres', 'postgres', 'your_password', {
  host: 'localhost',
  dialect: 'postgres'
});
```

## Running the Application

1. Start the server:
```bash
npm start
```
2. Access the application at `http://localhost:3002`

## API Endpoints

### Identity Management
- `POST /identity` - Create a new decentralized identity
- `GET /identity/:id` - Retrieve an identity by ID
- `GET /identity/:id/did-document` - Get the DID Document for an identity
- `PUT /identity/:id` - Update an identity
- `DELETE /identity/:id` - Delete an identity

### Credential Management
- `POST /identity/credentials` - Issue a new verifiable credential
- `POST /identity/credentials/verify` - Verify a credential

## Usage Guide

### 1. Creating an Identity

1. Navigate to "Add Identity" section
2. Enter name and email
3. Click "Create"
4. Save the generated DID for future use

### 2. Issuing a Credential

1. Go to "Create Credential" section
2. Enter the issuer's DID
3. Enter the subject's DID (recipient)
4. Choose between Simple or Advanced mode:
   - Simple: Enter a basic claim
   - Advanced: Enter structured JSON data
5. Click "Issue"

### 3. Verifying a Credential

1. Go to "Verify Credential" section
2. Paste the complete credential JSON
3. Click "Verify"
4. View the verification result

### 4. Viewing DID Documents

1. Navigate to "DID Document" section
2. Enter a DID
3. Click "View"
4. See the complete DID Document with public key information

## Data Models

### Identity Model
```javascript
{
  id: String (DID),
  name: String,
  email: String,
  publicKey: Text,
  privateKey: Text
}
```

### Credential Model
```javascript
{
  id: String,
  issuer: String,
  subject: String,
  credentialData: Text,
  proof: Text,
  proofType: String,
  issuanceDate: Date
}
```

## Security Notes

- Private keys are stored in the database for demonstration purposes only
- In a production environment, implement proper key management
- Use secure communication channels (HTTPS)
- Implement proper access control and authentication

## Error Handling

The system includes comprehensive error handling for:
- Invalid DIDs
- Missing or malformed credentials
- Cryptographic operation failures
- Database operation failures

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- W3C DID Specification
- W3C Verifiable Credentials Data Model
- Node.js Crypto Module Documentation

## Troubleshooting

### Common Issues

1. Database Connection Errors
   - Check PostgreSQL credentials
   - Ensure database service is running

2. Credential Verification Failures
   - Verify issuer DID exists
   - Check credential format
   - Ensure complete credential JSON is provided

3. Key Generation Errors
   - Verify Node.js version compatibility
   - Check system crypto module availability

For additional support, please open an issue in the repository.