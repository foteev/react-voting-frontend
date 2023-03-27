# Voting System for EVM-chains

Voting App storing poll and voting information on the Ethereum blockchain.

---
## Technologies Used
- [Solidity](https://docs.soliditylang.org/en/latest/)
- [Hardhat](https://hardhat.org/)
- [Ethers Js](https://docs.ethers.io/v5/)
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)

---
## Demo
https://bnbverse-voting-app.netlify.app/


## []()Server requirements

-   Node JS ^16.18

## []()Frontend deploy

-   Clone the repository
  
    ```
     npm install
    ```
    
-   Start react dev
    
    ```
    npm run start
    ```
    
-   Deploy address
    
    ```
    http://localhost:3000
    ```
    

## []()Hardhat contract deploy

-   Clone the repository
  
    ```
     npm install
    ```
    
-   Start hardhat node
    
    ```
    npx hardhat node
    ```
    
-   Deploy voting contract 
    
    ```
    npx hardhat run --network localhost .\scripts\deploy.js
    ```

    -   Contract address will be logged in console
    
    ```
    VotingSystem deployed to: 0x0B306BF915C4d645ff596e518fAf3F9669b97016  by  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    ```

    ## []()Remix deploy

-   Clone the repository and copy all code from file
  
    ```
     ('./contracts/VotingSystem.sol')VotingSystem.sol
    ```
    
-   Open Remix
    
    ```
    https://remix.ethereum.org/
    ```
    
-   Create, compile and deploy new contract on every EVM-chain

    