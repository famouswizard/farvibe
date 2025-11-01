/*
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title FarVibeRegistry
/// @notice Stores the latest vibe for each user on Base mainnet.
contract FarVibeRegistry {
    struct Vibe {
        string vibeCategory;
        string songTitle;
        string youtubeUrl;
        uint256 timestamp;
    }

    mapping(address => Vibe) public vibes;

    event VibeRecorded(
        address indexed user,
        string vibeCategory,
        string songTitle,
        string youtubeUrl,
        uint256 timestamp
    );

    function recordVibe(
        string calldata vibeCategory,
        string calldata songTitle,
        string calldata youtubeUrl
    ) external {
        Vibe memory v = Vibe({
            vibeCategory: vibeCategory,
            songTitle: songTitle,
            youtubeUrl: youtubeUrl,
            timestamp: block.timestamp
        });

        vibes[msg.sender] = v;
        emit VibeRecorded(
            msg.sender,
            vibeCategory,
            songTitle,
            youtubeUrl,
            block.timestamp
        );
    }

    function getVibe(address user) external view returns (Vibe memory) {
        return vibes[user];
    }
}
