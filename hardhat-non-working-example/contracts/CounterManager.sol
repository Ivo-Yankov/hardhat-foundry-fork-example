// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Counter.sol";

contract CounterManager {
    Counter private _counterContract;

    constructor(Counter counterAddress) {
        _counterContract = counterAddress;
    }

    function incrementCounter() public {
        _counterContract.increment();
    }

    function getCount() public view returns (uint256) {
        return _counterContract.getCount();
    }
}
