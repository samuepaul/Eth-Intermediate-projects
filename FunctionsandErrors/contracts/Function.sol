// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract ErrorHandling {
    uint public contractBalance = 0;

    event Deposited(uint amount);
    event Withdrawn(uint amount);

    error ZeroAmountError(string message);
    error InsufficientBalanceError(string message);
    error DivisionByZeroError();

    function deposit(uint amount) public {
        if (amount == 0) {
            revert ZeroAmountError("Deposit amount must be greater than zero");
        }
        contractBalance += amount;
        emit Deposited(amount);
    }

    function withdraw(uint amount) public {
        if (amount == 0) {
            revert ZeroAmountError("Withdrawal amount must be greater than zero");
        }
        if (amount > contractBalance) {
            revert InsufficientBalanceError("Insufficient balance for withdrawal");
        }
        contractBalance -= amount;
        emit Withdrawn(amount);
    }

    function divide(uint numerator, uint denominator) public pure returns (uint) {
        if (denominator == 0) {
            revert DivisionByZeroError();
        }
        return numerator / denominator;
    }

    function checkInvariant() public view {
        // Asserting an invariant: The contract balance should never be negative
        assert(contractBalance >= 0);
    }

    function conditionalRevert(bool condition) public pure {
        // Demonstrate a practical use of revert with a condition
        if (condition) {
            revert("Condition was true, transaction reverted");
        }
    }
}
