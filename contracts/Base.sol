// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "./Owned.sol";

contract Base is Owned {
    bool public isPaused = false;
    /// Contract is temporarily paused.
    error ContractPaused();

    /// Contract is not paused.
    error ContractNotPaused();

    /// Transfer failed.
    error TransferFailed();

    /// Insufficient Balance
    error InsufficientBalance();

    modifier onlyWhenNotPaused() {
        if (isPaused) {
            revert ContractPaused();
        }
        _;
    }

    modifier onlyWhenPaused() {
        if (!isPaused) {
            revert ContractNotPaused();
        }
        _;
    }

    function selfDestruct() external onlyWhenPaused onlyOwner {
        selfdestruct(owner);
    }

    function pauseContract() external onlyOwner {
        isPaused = true;
    }

    function resumeContract() external onlyOwner {
        isPaused = false;
    }

    function withdrawMoneyTo(address payable _to, uint256 amount)
        public
        onlyOwner
    {
        if (amount > getBalance()) {
            revert InsufficientBalance();
        }
        _to.transfer(amount);
    }

    function withdrawMoneyTo(address payable _to) external onlyOwner {
        withdrawMoneyTo(_to, getBalance());
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
