# Starpass NFT Front-end

## Table of Contents
Introduction
Features
Technologies-used
Prerequisites
Installation
Configuration
Usage
Project-structure
Components
Contract-interactions
Styling
Error-handling
Testing
Deployment
Contributing
Contact

## Introduction

Starpass NFT is a decentralized application (dApp) built on the Stacks blockchain. It provides a user-friendly interface for interacting with the Starpass NFT smart contract, allowing users to mint, transfer, and lease NFTs with various tiers and royalty structures.

This front-end application is designed to work seamlessly with the Starpass NFT smart contract, providing a robust and intuitive user experience for NFT enthusiasts and creators.

## Features

- Connect to Stacks wallet
- Mint new NFTs with customizable tiers, metadata, and royalty percentages
- Transfer NFTs to other users
- Lease NFTs for a specified duration
- View detailed information about owned NFTs
- Responsive design for both desktop and mobile devices

## Technologies Used

- React.js
- Stacks.js (@stacks/connect-react, @stacks/auth, @stacks/transactions)
- React-Toastify for notifications
- CSS3 for styling

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- A modern web browser with Stacks wallet extension (e.g., Hiro Wallet)

## Installation

To install the Starpass NFT front-end, follow these steps:

1. Clone the repository:

2. Navigate to the project directory:

3. Install the dependencies:
   ```
   npm install
   ```

## Configuration

Before running the application, you need to configure it to work with your deployed Starpass NFT smart contract:

1. Open `src/utils/contractInteractions.js`
2. Update the `CONTRACT_ADDRESS` and `CONTRACT_NAME` constants with your deployed contract details:
   ```javascript
   const CONTRACT_ADDRESS
   const CONTRACT_NAME
   ```

## Usage

To run the application locally:

1. Start the development server:
   ```
   npm start
   ```

2. Open your web browser and navigate to `http://localhost:3000`

3. Connect your Stacks wallet using the "Connect Wallet" button

4. Interact with the various features of the application (minting, transferring, leasing NFTs)

## Project Structure

The project structure is organized as follows:

```
starpass-nft-frontend/
├── public/
│   ├── index.html
│   └── app-icon.png
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.js
│   │   ├── NFTInfo.js
│   │   ├── NFTLeasing.js
│   │   ├── NFTMinter.js
│   │   └── NFTTransfer.js
│   ├── utils/
│   │   └── contractInteractions.js
│   ├── styles/
│   │   └── App.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Components

### App.js
The main component that sets up the application structure, handles user authentication, and renders child components.

### NFTMinter.js
Handles the minting of new NFTs, including form validation and interaction with the smart contract.

### NFTTransfer.js
Manages the transfer of NFTs between users, including form validation and contract interaction.

### NFTLeasing.js
Handles the leasing of NFTs, including setting lease duration and interacting with the smart contract.

### NFTInfo.js
Displays detailed information about a specific NFT, fetching data from the smart contract.

### ErrorBoundary.js
A React error boundary component that catches and displays errors that occur within its child components.

## Contract Interactions

The `contractInteractions.js` file in the `utils` directory contains all the functions for interacting with the Starpass NFT smart contract. This includes functions for minting, transferring, leasing, and fetching NFT information.

## Styling

The application uses a custom CSS file (`App.css`) for styling. The design is responsive and adapts to different screen sizes. The color scheme and layout are designed to provide a professional and user-friendly interface.

## Error Handling

Error handling is implemented throughout the application:

- Form validation in components to prevent invalid data submission
- Try-catch blocks in contract interaction functions to catch and handle errors
- An ErrorBoundary component to catch and display unexpected errors
- Toast notifications to provide user feedback on actions and errors

## Testing

(Note: Add information about your testing setup and how to run tests once you've implemented them)

To run the test suite:

```
npm test
```

## Deployment

To build the application for production:

1. Run the build command:
   ```
   npm run build
   ```

2. The built files will be in the `build/` directory. You can deploy these files to any static hosting service (e.g., Netlify, Vercel, GitHub Pages).

## Contributing

Contributions to the Starpass NFT front-end project are welcome. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch 
3. Make your changes
4. Commit your changes 
5. Push to the branch 
6. Open a Pull Request

Please ensure your code adheres to the existing style and that you've tested your changes thoroughly.


## Contact

If you have any questions or feedback, please reach out to:

Amobi Ndubuisi - dev.triggerfish@gmail.com
