// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {
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

    // mapping of the courseHash to Course data
    mapping(bytes32 => Course) private ownedCourses;

    // mapping of courseId to courseHash
    mapping(uint256 => bytes32) private ownedCourseHash;

    // number of all courses + id of the course
    uint256 private totalOwnedCourses;

    // courseId - 0x00000000000000000000000000003130
    // proof - 0x0000000000000000000000000000313000000000000000000000000000003130
    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
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
}
