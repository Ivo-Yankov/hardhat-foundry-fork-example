// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {CounterManager} from "../src/CounterManager.sol";

contract CounterTest is Test {
    CounterManager public counterManager;
    uint256 public initialValue = 2;
    address public counterAddress = 0x23f5e49569A835d7bf9AefD30e4f60CdD570f225;

    function setUp() public {
        counterManager = new CounterManager(counterAddress);
    }

    function test_getCount() view public {
        uint256 count = counterManager.getCount();
        assertEq(count, initialValue);
    }

    function test_increment() public {
        counterManager.incrementCounter();

        uint256 count = counterManager.getCount();
        assertEq(count, initialValue + 1);

        counterManager.incrementCounter();

        uint256 count2 = counterManager.getCount();
        assertEq(count2, initialValue + 2);

        counterManager.incrementCounter();
        counterManager.incrementCounter();

        uint256 count3 = counterManager.getCount();
        assertEq(count3, initialValue + 4);
    }
}
