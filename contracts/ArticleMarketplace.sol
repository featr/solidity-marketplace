// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "hardhat/console.sol";

contract ArticleMarketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        uint256 id; // 32
        uint256 price; // 32
        bytes32 proof; // 32
        address owner; // 20
        State state; // 1
    }

    bool public isPaused = false;

    // mapping of the courseHash to Course data
    mapping(bytes32 => Course) private ownedCourses;

    // mapping of courseId to courseHash
    mapping(uint256 => bytes32) private ownedCourseHash;

    // number of all courses + id of the course
    uint256 private totalOwnedCourses;

    // owner of the contract
    address payable private owner;

    constructor() {
        setContractOwner(msg.sender);
    }

    /// Course has already been purchased!
    error CourseHasOwner();

    /// Only owner can access this function!
    error OnlyOwner();

    /// Contract is temporarily paused.
    error ContractPaused();

    /// Contract is not paused.
    error ContractNotPaused();

    /// Transfer failed.
    error TransferFailed();

    /// Insufficient Balance
    error InsufficientBalance();

    /// Only owner should have access to the function body!
    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _;
    }

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

    receive() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
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

    function pauseContract() external onlyOwner {
        isPaused = true;
    }

    function resumeContract() external onlyOwner {
        isPaused = false;
    }

    function selfDestruct() external onlyWhenPaused onlyOwner {
        selfdestruct(owner);
    }

    function purchaseCourse(bytes32 courseId, bytes32 proof)
        external
        payable
        onlyWhenNotPaused
    {
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

        if (hasCourseOwnership(courseHash)) {
            revert CourseHasOwner();
        }

        uint256 id = totalOwnedCourses++;
        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    function getCourseCount() external view returns (uint256) {
        return totalOwnedCourses;
    }

    function getCourseHashAtIndex(uint256 index)
        external
        view
        returns (bytes32)
    {
        return ownedCourseHash[index];
    }

    function getCourseByHash(bytes32 courseHash)
        external
        view
        returns (Course memory)
    {
        return ownedCourses[courseHash];
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    function hasCourseOwnership(bytes32 courseHash)
        private
        view
        returns (bool)
    {
        return ownedCourses[courseHash].owner == msg.sender;
    }
}
