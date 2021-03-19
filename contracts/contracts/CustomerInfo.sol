// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract CustomerInfo {
    address public owner = msg.sender;
    event UpdateCustomer(address indexed _from, string _alias, uint _amount);

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    /**
      * @dev Updates the customer and emit an event to let the others, e.g. front end,
      *     listening on that event and consuming the data
      * @param _alias the customer alias
      * @param _amount the amount
      */
    function setCustomer(string memory _alias, uint256 _amount) public onlyOwner {
        emit UpdateCustomer(msg.sender, _alias, _amount);
    }
}
