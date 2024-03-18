// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Counter {
    uint256 private _count;

    constructor() {
        _count = 0;
    }

    function getCount() public view returns (uint256) {
        return _count;
    }

    function increment() public {
        _count += 1;
    }
}