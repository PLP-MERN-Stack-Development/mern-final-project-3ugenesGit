// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RewardToken
 * @notice Simple ERC-20 token for rewarding verified waste reports.
 * Owners can authorise backend wallets to mint user rewards or run lotteries.
 */
contract RewardToken is ERC20, Ownable {
    mapping(address => bool) public rewarders;

    event RewarderUpdated(address indexed account, bool allowed);
    event RewardMinted(address indexed to, uint256 amount, uint256 multiplierBps);

    constructor() ERC20("Reward Token", "RWT") Ownable(msg.sender) {}

    function setRewarder(address account, bool allowed) external onlyOwner {
        rewarders[account] = allowed;
        emit RewarderUpdated(account, allowed);
    }

    function mintReward(address to, uint256 baseAmount, uint256 multiplierBps) external {
        require(rewarders[msg.sender] || msg.sender == owner(), "Not authorised");
        uint256 amount = (baseAmount * multiplierBps) / 10_000;
        _mint(to, amount);
        emit RewardMinted(to, amount, multiplierBps);
    }

    function batchReward(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {
        require(recipients.length == amounts.length, "Length mismatch");
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
            emit RewardMinted(recipients[i], amounts[i], 10_000);
        }
    }
}

