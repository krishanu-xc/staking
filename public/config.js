export const lockXGRAVContractAddress = '0x10865193176a92CfEa6c2c8c69A713bF6A3be341'

export const lockXGRAVAbi = [
    {
        "inputs": [],
        "name": "adminWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_ids",
                "type": "uint256[]"
            }
        ],
        "name": "batchWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "lockTokens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "lockId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newAdmin",
                "type": "address"
            }
        ],
        "name": "transferAdminRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "withdrawTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_admin",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_grav",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_xgrav",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getCurrentRewards",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_staker",
                "type": "address"
            }
        ],
        "name": "getStakedIDs",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getStakeInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lockedUntil",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "staker",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "unstaked",
                        "type": "bool"
                    }
                ],
                "internalType": "struct TokenLock.StakeInfo",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "STAKING_PERIOD",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export const singleContractAddress = '0x81C9ADeb1d0AC06331D8467E5FA527B8b44b907e'

export const singleAbi = [
    {
        "type": "constructor",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "_grav",
                "internalType": "address",
                "type": "address"
            }
        ]
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "indexed": true,
                "name": "previousOwner"
            },
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address",
                "indexed": true
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "type": "function",
        "inputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "balances",
        "stateMutability": "view"
    },
    {
        "inputs": [],
        "name": "lastUpdateTime",
        "stateMutability": "view",
        "type": "function",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": ""
            }
        ],
        "name": "owner",
        "inputs": []
    },
    {
        "type": "function",
        "outputs": [
            {
                "internalType": "bool",
                "type": "bool",
                "name": ""
            }
        ],
        "name": "paused",
        "inputs": [],
        "stateMutability": "view"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "type": "function",
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "rewardPerTokenStored",
        "stateMutability": "view",
        "inputs": [],
        "type": "function"
    },
    {
        "name": "rewardRate",
        "stateMutability": "view",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "inputs": [],
        "type": "function"
    },
    {
        "stateMutability": "view",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "type": "function",
        "inputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": ""
            }
        ],
        "name": "rewards"
    },
    {
        "stateMutability": "nonpayable",
        "name": "transferOwnership",
        "type": "function",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": []
    },
    {
        "name": "userRewardPerTokenPaid",
        "type": "function",
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "stateMutability": "view",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "function",
        "inputs": [
            {
                "type": "bool",
                "name": "status",
                "internalType": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "pauseContract"
    },
    {
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "rewardPerToken",
        "inputs": [],
        "type": "function",
        "stateMutability": "view"
    },
    {
        "type": "function",
        "stateMutability": "view",
        "name": "earned",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ]
    },
    {
        "name": "stake",
        "type": "function",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "uint256",
                "name": "_amount",
                "internalType": "uint256"
            }
        ],
        "outputs": []
    },
    {
        "outputs": [],
        "name": "withdraw",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "uint256",
                "name": "_amount",
                "internalType": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [],
        "outputs": [],
        "type": "function",
        "stateMutability": "nonpayable",
        "name": "getReward"
    },
    {
        "type": "function",
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "_rate"
            }
        ],
        "name": "setRewardRate",
        "stateMutability": "nonpayable",
        "outputs": []
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "setGrav",
        "inputs": [
            {
                "name": "_grav",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "name": "retrieveGrav",
        "inputs": [],
        "stateMutability": "nonpayable",
        "outputs": [],
        "type": "function"
    }
]

export const lockContractAddress = '0x9Af560d9e944C0A7aAfA3208AD5DD56a1dC6D45a'

export const lockAbi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_stakingPeriodInDays",
                "type": "uint256"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "togglePause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_admin",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_tokenAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_maxRate",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "stakedAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "stakingTime",
                "type": "uint256"
            }
        ],
        "name": "TokensStaked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "unstakedAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "unstakingTime",
                "type": "uint256"
            }
        ],
        "name": "TokensUnstaked",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "unstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unstakeAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "updatecurrentStakingTime",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_newMaxMonths",
                "type": "uint256"
            }
        ],
        "name": "updateMaxMonths",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_newMaxRate",
                "type": "uint256"
            }
        ],
        "name": "updateMaxRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_newPenaltyRate",
                "type": "uint256"
            }
        ],
        "name": "updatePenaltyRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllStakers",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCurrentRewards",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCurrentStakedAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTotalStakers",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_staker",
                "type": "address"
            }
        ],
        "name": "getUserStakedAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxMonths",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "penaltyRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export const tokenAddress = '0x5DCE7A3E8B53387A9Ee1cE0d855b7A8d948100A3'

export const tokenAbi = [
    {
        "stateMutability": "nonpayable",
        "type": "constructor",
        "inputs": []
    },
    {
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "indexed": false,
                "name": "value"
            }
        ],
        "name": "Approval",
        "type": "event",
        "anonymous": false
    },
    {
        "type": "event",
        "inputs": [
            {
                "internalType": "address",
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "type": "address",
                "name": "to"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "anonymous": false,
        "name": "Transfer"
    },
    {
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "internalType": "address",
                "type": "address",
                "name": "spender"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "type": "function",
        "stateMutability": "view",
        "name": "allowance"
    },
    {
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "inputs": [
            {
                "name": "spender",
                "type": "address",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "amount"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "approve"
    },
    {
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "account"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "name": "balanceOf",
        "type": "function",
        "stateMutability": "view"
    },
    {
        "name": "decimals",
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "internalType": "uint8",
                "name": ""
            }
        ]
    },
    {
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "spender"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "subtractedValue"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "name": "decreaseAllowance",
        "type": "function"
    },
    {
        "type": "function",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "spender"
            },
            {
                "type": "uint256",
                "name": "addedValue",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "bool",
                "internalType": "bool",
                "name": ""
            }
        ],
        "name": "increaseAllowance"
    },
    {
        "name": "name",
        "outputs": [
            {
                "type": "string",
                "internalType": "string",
                "name": ""
            }
        ],
        "stateMutability": "view",
        "inputs": [],
        "type": "function"
    },
    {
        "stateMutability": "view",
        "inputs": [],
        "name": "symbol",
        "type": "function",
        "outputs": [
            {
                "name": "",
                "internalType": "string",
                "type": "string"
            }
        ]
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "stateMutability": "view",
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "to"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "name": "transfer"
    },
    {
        "name": "transferFrom",
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "type": "address",
                "name": "from",
                "internalType": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "amount"
            }
        ],
        "outputs": [],
        "name": "_mintToken",
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export const nftAddress = '0x870c0238e8779fe9f568dd1cc907fa449dbe8552'

export const nftABI = [
    {
        "type": "constructor",
        "stateMutability": "nonpayable",
        "inputs": []
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "indexed": true,
                "type": "address"
            },
            {
                "name": "approved",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "indexed": true,
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "name": "Approval",
        "anonymous": false,
        "type": "event"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "internalType": "address",
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "name": "operator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "bool",
                "internalType": "bool",
                "indexed": false,
                "name": "approved"
            }
        ],
        "name": "ApprovalForAll"
    },
    {
        "inputs": [
            {
                "name": "from",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "internalType": "uint256",
                "indexed": true,
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "type": "event",
        "anonymous": false,
        "name": "Transfer"
    },
    {
        "name": "approve",
        "inputs": [
            {
                "name": "to",
                "internalType": "address",
                "type": "address"
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "outputs": []
    },
    {
        "stateMutability": "view",
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "type": "function",
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": ""
            }
        ],
        "name": "getApproved",
        "stateMutability": "view"
    },
    {
        "stateMutability": "view",
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "type": "function",
        "name": "isApprovedForAll",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "stateMutability": "view",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "type": "function",
        "inputs": [],
        "name": "name",
        "constant": true,
        "signature": "0x06fdde03"
    },
    {
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "ownerOf",
        "type": "function",
        "stateMutability": "view"
    },
    {
        "outputs": [],
        "name": "safeTransferFrom",
        "type": "function",
        "inputs": [
            {
                "name": "from",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "to",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "inputs": [
            {
                "type": "address",
                "name": "from",
                "internalType": "address"
            },
            {
                "type": "address",
                "internalType": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "tokenId"
            },
            {
                "type": "bytes",
                "name": "_data",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "type": "function",
        "stateMutability": "nonpayable",
        "name": "safeTransferFrom"
    },
    {
        "name": "setApprovalForAll",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "type": "bool",
                "name": "approved",
                "internalType": "bool"
            }
        ],
        "outputs": [],
        "type": "function"
    },
    {
        "stateMutability": "view",
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "name": "supportsInterface",
        "type": "function",
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ]
    },
    {
        "inputs": [],
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "name": "symbol",
        "type": "function",
        "constant": true,
        "signature": "0x95d89b41"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "index"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "name": "tokenByIndex",
        "type": "function",
        "stateMutability": "view"
    },
    {
        "name": "tokenOfOwnerByIndex",
        "type": "function",
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "name": "index",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": ""
            }
        ],
        "stateMutability": "view",
        "constant": true,
        "signature": "0x2f745c59"
    },
    {
        "name": "tokenURI",
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "internalType": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "inputs": [],
        "type": "function",
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "constant": true,
        "signature": "0x18160ddd"
    },
    {
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "address",
                "name": "from",
                "internalType": "address"
            },
            {
                "name": "to",
                "internalType": "address",
                "type": "address"
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "type": "function",
        "name": "transferFrom"
    },
    {
        "name": "mint",
        "type": "function",
        "outputs": [],
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "amount",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "signature": "0xa0712d68"
    }
]

export const nftContractAddress = '0xFd3089C922fb9694ffC06b4c4cD0deBADF09CF94'

export const nftContractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "tokenIds",
                "type": "uint256[]"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "signature",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct PriceSigner.Price",
                "name": "price",
                "type": "tuple"
            }
        ],
        "name": "claimRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "tokenIds",
                "type": "uint256[]"
            }
        ],
        "name": "emergencyUnstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nft",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "retrieveRewardToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_rate",
                "type": "uint256"
            }
        ],
        "name": "serRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nft",
                "type": "address"
            }
        ],
        "name": "setNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_signer",
                "type": "address"
            }
        ],
        "name": "setSigner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            }
        ],
        "name": "setToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "tokenIds",
                "type": "uint256[]"
            }
        ],
        "name": "stakeNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "stopRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "tokenIds",
                "type": "uint256[]"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "signature",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct PriceSigner.Price",
                "name": "price",
                "type": "tuple"
            }
        ],
        "name": "unstakeTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getReward",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "signature",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct PriceSigner.Price",
                "name": "result",
                "type": "tuple"
            }
        ],
        "name": "getSigner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getUserStaked",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "Rate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "stakedTokens",
        "outputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "stakeTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "position",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "stopTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]