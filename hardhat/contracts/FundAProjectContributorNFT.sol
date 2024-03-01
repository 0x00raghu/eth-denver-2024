// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract FundAProjectContributorNFT is ERC721 {
    address public owner;
    address public fundAProjectAddress;
    uint256 private _nextTokenId;

    constructor() ERC721("FundAProjectContributorNFT", "FAPC") {
        owner = msg.sender;
    }

    function setFundAProjectAddress(address _fundAProjectAddress) public {
        require(msg.sender == owner, "only owner can set the address");
        fundAProjectAddress = _fundAProjectAddress;
    }

    function awardNft(address user) public {
        require(
            msg.sender == fundAProjectAddress,
            "mint only works from fundAProjectAddress"
        );
        uint256 tokenId = _nextTokenId++;
        _mint(user, tokenId);
    }
}
