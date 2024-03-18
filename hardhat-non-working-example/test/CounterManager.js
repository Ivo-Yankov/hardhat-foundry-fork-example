const { expect } = require("chai");
const {ethers} = require("hardhat");

describe("CounterManager", function () {
    let CounterManager;
    let counter;
    let counterManager;
    let initialCounter = 2;

    beforeEach(async function () {
        const counterAddress = '0x23f5e49569A835d7bf9AefD30e4f60CdD570f225';

        // Deploy Counter contract
        counter = await ethers.getContractAt("Counter", counterAddress);

        // Deploy CounterManager contract, passing the Counter contract address
        CounterManager = await ethers.getContractFactory("CounterManager");
        counterManager = await CounterManager.deploy(counterAddress);
        await counterManager.waitForDeployment();
        const counterManagerAddress = await counterManager.getAddress();
        console.log("CounterManager deployed to:", counterManagerAddress);

        counterManager = await ethers.getContractAt("CounterManager", counterManagerAddress);
    });

    it("should increment the counter", async function () {
        // Get initial counter value
        let initialValue = await counter.getCount();
        expect(initialValue).to.equal(initialCounter);

        // Increment counter through CounterManager contract
        await counterManager.incrementCounter();

        // Get counter value after increment
        let incrementedValue = await counter.getCount();
        expect(incrementedValue).to.equal(initialCounter + 1);

        // Get counter value after increment
        let incrementedValueFromManager = await counterManager.getCount();
        expect(incrementedValueFromManager).to.equal(initialCounter + 1);
    });
});