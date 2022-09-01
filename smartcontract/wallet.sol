// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Wallet is Ownable{
    address busdt = 0x766C3CEe9B941817c469d31604493F5B235aB9A8;
    address div1 = 0xF0361fd8673998f671411a5466239A0Ee9ad4808;
    address div2 = 0x1A0060D9d3e5359bE0919bA7A256443f9f91f388;
    address div3 = 0x774A9043A997395648E1e74995059C96B68df445;

    uint256 divP1 = 70;
    uint256 divP2 = 15;
    uint256 divP3 = 15;
    uint256 divT = 100;

    function distribute() external{
        uint256 balance = ERC20(busdt).balanceOf(address(this));
        ERC20(busdt).transfer(div1, balance * divP1 / 100);
        ERC20(busdt).transfer(div1, balance * divP2 / 100);
        ERC20(busdt).transfer(div1, balance - balance * (divP1 + divP2) / 100);
    }
}