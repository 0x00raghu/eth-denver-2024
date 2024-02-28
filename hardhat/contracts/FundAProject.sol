// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./FundAProjectContributor.sol";

contract FundAProject {
    address payable public owner;
    FundAProjectContributor public fundAProjectContributor;

    IERC20 public usdcToken;

    struct Project {
        string name;
        uint256 usdcBalance;
        uint256 ethBalance;
        address owner;
        string gitUrl;
        // write remaining properties
    }

    Project[] public projects;

    constructor(address _usdcAddress, address nftAddress) {
        owner = payable(msg.sender);
        usdcToken = IERC20(_usdcAddress);
        fundAProjectContributor = FundAProjectContributor(nftAddress);
    }

    function createProject(string calldata _name, string calldata _gitUrl)
        public
        returns (bool)
    {
        projects.push(Project(_name, 0, 0, msg.sender, _gitUrl));

        return true;
    }

    function fundUSDC(uint256 _amount, uint256 projectNo) public {
        require(_amount > 0, "You need to contribute some USDC");
        uint256 allowance = usdcToken.allowance(msg.sender, address(this));
        require(_amount <= allowance, "Check the token allowance");
        projects[projectNo].usdcBalance += _amount;
        usdcToken.transferFrom(msg.sender, address(this), _amount);

        // award nft to msg.sender
        fundAProjectContributor.awardNft(msg.sender);
    }

    function fundEth(uint256 projectNo) public payable {
        require(msg.value > 0, "You need to send some Ether");
        projects[projectNo].ethBalance += msg.value;
        // awart nft to msg,sender
        fundAProjectContributor.awardNft(msg.sender);
    }

    function withdrawUSDC(uint256 projectNo) public {
        require(
            msg.sender == projects[projectNo].owner,
            "Only Project owner can withdraw"
        );

        usdcToken.transfer(msg.sender, projects[projectNo].usdcBalance);
    }

    function withdrawEth(uint256 projectNo) public {
        require(
            msg.sender == projects[projectNo].owner,
            "Only Project owner can withdraw"
        );

        payable(msg.sender).transfer(projects[projectNo].ethBalance);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
