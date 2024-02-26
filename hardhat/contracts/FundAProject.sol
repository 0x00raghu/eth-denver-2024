// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FundAProject {
    address payable public owner;
    uint public goal;
    uint public raisedAmount;
    IERC20 public usdcToken;
    
    mapping(address => uint) public contributors;

    constructor(uint _goal, address _usdcAddress) {
        owner = payable(msg.sender);
        goal = _goal;
        usdcToken = IERC20(_usdcAddress);
    }

    function contribute(uint _amount) public {
        require(_amount > 0, "You need to contribute some USDC");
        uint allowance = usdcToken.allowance(msg.sender, address(this));
        require(_amount <= allowance, "Check the token allowance");

        contributors[msg.sender] += _amount;
        raisedAmount += _amount;

        usdcToken.transferFrom(msg.sender, address(this), _amount);
    }

    function contribute() public payable {
        require(msg.value > 0, "You need to send some Ether");
        contributors[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    function withdrawERC20() public {
        require(raisedAmount >= goal, "Funding goal not met");
        require(msg.sender == owner, "Only owner can withdraw funds");

        uint balance = usdcToken.balanceOf(address(this));
        usdcToken.transfer(owner, balance);
    }

    

    constructor(uint _goal) {
        owner = payable(msg.sender);
        goal = _goal;
    }

    

    function withdraw() public {
        require(address(this).balance >= goal, "Funding goal not met");
        require(msg.sender == owner, "Only owner can withdraw funds");

        owner.transfer(address(this).balance);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}