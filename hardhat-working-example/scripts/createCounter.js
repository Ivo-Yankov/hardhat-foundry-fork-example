// Import required libraries
const { ethers } = require("hardhat");

async function main() {
    // Compile the contract
    const Counter = await ethers.getContractFactory("Counter");

    // Deploy the contract
    console.log("Deploying Counter...");
    const counter = await Counter.deploy();
    await counter.waitForDeployment();
    const address = await counter.getAddress();
    console.log("Counter deployed to:", address);

    const deployedContract = await ethers.getContractAt("Counter", address);

    // Get the initial counter value
    const initialValue = await deployedContract.getCount();
    console.log("Initial counter value:", initialValue);

    // Increment the counter twice
    console.log("Incrementing counter value twice...");
    await deployedContract.increment();
    await deployedContract.increment();

    await new Promise(r => setTimeout(r, 2000));

    // Get the final counter value
    const finalValue = await deployedContract.getCount();
    console.log("Final counter value:", finalValue);
}

// Execute the main function
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });