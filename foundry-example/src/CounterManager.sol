// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface CounterInterface {
    function getCount() external view returns (uint256);
    function increment() external;
}

contract CounterManager {
    CounterInterface public _counterContract;

    constructor(address counterAddress) {
        _counterContract = CounterInterface(counterAddress);
    }

    function incrementCounter() public {
        _counterContract.increment();
    }

    function getCount() public view returns (uint256) {
        return _counterContract.getCount();
    }
}
