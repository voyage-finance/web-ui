export default [
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'facetAddress',
            type: 'address',
          },
          {
            internalType: 'enum IDiamondCut.FacetCutAction',
            name: 'action',
            type: 'uint8',
          },
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
        ],
        indexed: false,
        internalType: 'struct IDiamondCut.FacetCut[]',
        name: '_diamondCut',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_init',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_calldata',
        type: 'bytes',
      },
    ],
    name: 'DiamondCut',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'facetAddress',
            type: 'address',
          },
          {
            internalType: 'enum IDiamondCut.FacetCutAction',
            name: 'action',
            type: 'uint8',
          },
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
        ],
        internalType: 'struct IDiamondCut.FacetCut[]',
        name: '_diamondCut',
        type: 'tuple[]',
      },
      {
        internalType: 'address',
        name: '_init',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_calldata',
        type: 'bytes',
      },
    ],
    name: 'diamondCut',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: '_functionSelector',
        type: 'bytes4',
      },
    ],
    name: 'facetAddress',
    outputs: [
      {
        internalType: 'address',
        name: 'facetAddress_',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'facetAddresses',
    outputs: [
      {
        internalType: 'address[]',
        name: 'facetAddresses_',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_facet',
        type: 'address',
      },
    ],
    name: 'facetFunctionSelectors',
    outputs: [
      {
        internalType: 'bytes4[]',
        name: 'facetFunctionSelectors_',
        type: 'bytes4[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'facets',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'facetAddress',
            type: 'address',
          },
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
        ],
        internalType: 'struct IDiamondLoupe.Facet[]',
        name: 'facets_',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: '_interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: 'owner_',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'InvalidConfiguratorContract',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'src',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'dst',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'sig',
        type: 'bytes4',
      },
    ],
    name: 'PermissionGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'src',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'dst',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'sig',
        type: 'bytes4',
      },
    ],
    name: 'PermissionRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'role',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'role',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'sig',
        type: 'bytes4',
      },
    ],
    name: 'RolePermissionGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'role',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'sig',
        type: 'bytes4',
      },
    ],
    name: 'RolePermissionRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'role',
        type: 'uint8',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_configurator',
        type: 'address',
      },
    ],
    name: 'authorizeConfigurator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'src',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'dst',
        type: 'address',
      },
      {
        internalType: 'bytes4',
        name: 'sig',
        type: 'bytes4',
      },
    ],
    name: 'grantPermission',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'role',
        type: 'uint8',
      },
      {
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'role',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'bytes4',
        name: 'sig',
        type: 'bytes4',
      },
    ],
    name: 'grantRolePermission',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'src',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'dst',
        type: 'address',
      },
      {
        internalType: 'bytes4',
        name: 'sig',
        type: 'bytes4',
      },
    ],
    name: 'isAuthorised',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'src',
        type: 'address',
      },
      {
        internalType: 'bytes4',
        name: 'sig',
        type: 'bytes4',
      },
    ],
    name: 'isAuthorisedInbound',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'dst',
        type: 'address',
      },
      {
        internalType: 'bytes4',
        name: 'sig',
        type: 'bytes4',
      },
    ],
    name: 'isAuthorisedOutbound',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_forwarder',
        type: 'address',
      },
    ],
    name: 'isTrustedForwarder',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'src',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'dst',
        type: 'address',
      },
      {
        internalType: 'bytes4',
        name: 'sig',
        type: 'bytes4',
      },
    ],
    name: 'revokePermission',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'role',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'bytes4',
        name: 'sig',
        type: 'bytes4',
      },
    ],
    name: 'revokeRolePermission',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'InvalidContract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidDecimals',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidInitialize',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_currency',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum Tranche',
        name: '_tranche',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_treasury',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_fee',
        type: 'uint256',
      },
    ],
    name: 'ProtocolFeeUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'ReserveActivated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'ReserveInactived',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_currency',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_juniorDepositTokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_seniorDepositTokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_interestRateStrategyAddress',
        type: 'address',
      },
    ],
    name: 'ReserveInitialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_currency',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum Tranche',
        name: '_tranche',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'activateReserve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'enum Tranche',
        name: '_tranche',
        type: 'uint8',
      },
    ],
    name: 'balance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'deactivateReserve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'enum Tranche',
        name: '_tranche',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_currency',
        type: 'address',
      },
    ],
    name: 'getReserveFlags',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'getReserveStatus',
    outputs: [
      {
        internalType: 'bool',
        name: 'initialized',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'activated',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_currency',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_interestRateStrategyAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_priceOracle',
        type: 'address',
      },
    ],
    name: 'initReserve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'unbonding',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_treasuryAddr',
        type: 'address',
      },
      {
        internalType: 'uint40',
        name: '_takeRate',
        type: 'uint40',
      },
    ],
    name: 'updateProtocolFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_weth9',
        type: 'address',
      },
    ],
    name: 'updateWETH9',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_priceOracle',
        type: 'address',
      },
    ],
    name: 'upgradePriceOracleImpl',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_currency',
        type: 'address',
      },
    ],
    name: 'utilizationRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'enum Tranche',
        name: '_tranche',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'BuyNowStaleTwap',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ExceedsFloorPrice',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientCash',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientJuniorLiquidity',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientLiquidity',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientVaultETHBalance',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidCollection',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidCurrencyType',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidDebt',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidFloorPrice',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidJuniorTrancheBalance',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidLiquidate',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidTokenid',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LiquidateStaleTwap',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Unauthorised',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_currency',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_loanId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_principal',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_interest',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_apr',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_protocolFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_marketplace',
        type: 'address',
      },
    ],
    name: 'Borrow',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_liquidator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_drowDownId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_repaymentId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_debt',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_fromJuniorTranche',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amountToWriteDown',
        type: 'uint256',
      },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_currency',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_loanId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_repaymentId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isFinal',
        type: 'bool',
      },
    ],
    name: 'Repayment',
    type: 'event',
  },
  {
    inputs: [],
    name: 'TEN_THOUSANDS',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_marketplace',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'buyNow',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
    ],
    name: 'getVaultDebt',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'interestBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
    ],
    name: 'juniorInterestBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_loanId',
        type: 'uint256',
      },
    ],
    name: 'liquidate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_principal',
        type: 'uint256',
      },
    ],
    name: 'previewBuyNowParams',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'epoch',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'term',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nper',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalPrincipal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalInterest',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'borrowRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takeRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'protocolFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'loanId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'principal',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'interest',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'fee',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'pmt',
                type: 'uint256',
              },
            ],
            internalType: 'struct PMT',
            name: 'pmt',
            type: 'tuple',
          },
        ],
        internalType: 'struct PreviewBuyNowParams',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'principalBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_loan',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: '_vault',
        type: 'address',
      },
    ],
    name: 'repay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
    ],
    name: 'seniorInterestBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'FailedDeployVault',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidCollectionAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidCurrencyAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidMarketplace',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidTreasuryAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidVaultImpl',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidWithdrawal',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_numVaults',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'refundAmount',
        type: 'uint256',
      },
    ],
    name: 'VaultCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_impl',
        type: 'address',
      },
    ],
    name: 'VaultImplementationUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_sponsor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'VaultMarginCredited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_sponsor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'VaultMarginRedeemed',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_marketplace',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'revoke',
        type: 'bool',
      },
    ],
    name: 'approveMarketplace',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'collectionInitialized',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'bytes20',
        name: '_salt',
        type: 'bytes20',
      },
    ],
    name: 'computeCounterfactualAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'bytes20',
        name: '_salt',
        type: 'bytes20',
      },
      {
        internalType: 'uint256',
        name: '_gasUnits',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_gasPrice',
        type: 'uint256',
      },
    ],
    name: 'createVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getVaultAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getVaultImpl',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_impl',
        type: 'address',
      },
    ],
    name: 'setVaultImpl',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'subVaultBeacon',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_currency',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'transferCurrency',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'transferETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_vaule',
        type: 'uint256',
      },
    ],
    name: 'unwrapVaultETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'vaultBeacon',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'withdrawNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'wrapVaultETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'IllegalLoanParameters',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidGSNConfiguration',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidGracePeriod',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidIncomeRatio',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidLiquidationBonus',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidLoanInterval',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidLoanTerm',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidMaxTwapStaleness',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidOptimalRatio',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ReserveNotInitialized',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_paymaster',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_trustedForwarder',
        type: 'address',
      },
    ],
    name: 'GSNConfigurationUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_incomeRatio',
        type: 'uint256',
      },
    ],
    name: 'IncomeRatioUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_liquidationBonus',
        type: 'uint256',
      },
    ],
    name: 'LiquidationConfigurationUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_epoch',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_term',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_gracePeriod',
        type: 'uint256',
      },
    ],
    name: 'LoanParametersUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_marketplace',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_strategy',
        type: 'address',
      },
    ],
    name: 'MarketplaceAdapterUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_maxTwapStaleness',
        type: 'uint256',
      },
    ],
    name: 'MaxTwapStaleness',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_optimalRatio',
        type: 'uint256',
      },
    ],
    name: 'OptimalLiquidityRatioUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'getIncomeRatio',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'getMaxTwapStaleness',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPaymasterAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_paymaster',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_trustedForwarder',
        type: 'address',
      },
    ],
    name: 'setGSNConfiguration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_ratio',
        type: 'uint256',
      },
    ],
    name: 'setIncomeRatio',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_reserve',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_interestRateStrategyAddress',
        type: 'address',
      },
    ],
    name: 'setInterestRateStrategyAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_liquidationBonus',
        type: 'uint256',
      },
    ],
    name: 'setLiquidationBonus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_epoch',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_term',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_gracePeriod',
        type: 'uint256',
      },
    ],
    name: 'setLoanParams',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_maxTwapStaleness',
        type: 'uint256',
      },
    ],
    name: 'setMaxTwapStaleness',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_ratio',
        type: 'uint256',
      },
    ],
    name: 'setOptimalLiquidityRatio',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_marketplace',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_strategy',
        type: 'address',
      },
    ],
    name: 'updateMarketPlaceData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_impl',
        type: 'address',
      },
    ],
    name: 'upgradeJuniorDepositTokenImpl',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_impl',
        type: 'address',
      },
    ],
    name: 'upgradeSeniorDepositTokenImpl',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCollections',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'getCreditLineData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'totalDebt',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint40',
                name: 'head',
                type: 'uint40',
              },
              {
                internalType: 'uint40',
                name: 'tail',
                type: 'uint40',
              },
            ],
            internalType: 'struct LoanList',
            name: 'loanList',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'gav',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'ltv',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'healthFactor',
            type: 'uint256',
          },
        ],
        internalType: 'struct CreditLineData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'getDepositTokens',
    outputs: [
      {
        internalType: 'address',
        name: 'senior',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'junior',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_loanId',
        type: 'uint256',
      },
    ],
    name: 'getLoanDetail',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'principal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'interest',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'term',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'epoch',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nper',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'reserve',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'principal',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'interest',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'fee',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'pmt',
                type: 'uint256',
              },
            ],
            internalType: 'struct PMT',
            name: 'pmt',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'apr',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'borrowAt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextPaymentDue',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalPrincipalPaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalInterestPaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'paidTimes',
            type: 'uint256',
          },
          {
            internalType: 'uint256[]',
            name: 'collateral',
            type: 'uint256[]',
          },
        ],
        internalType: 'struct LibLoan.LoanDetail',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'getPoolConfiguration',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'liquidationBonus',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'loanInterval',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'loanTenure',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'incomeRatio',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isInitialized',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
        ],
        internalType: 'struct DataProviderFacet.PoolConfiguration',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'getPoolData',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'totalLiquidity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'juniorLiquidity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'seniorLiquidity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'juniorLiquidityRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'seniorLiquidityRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalDebt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'utilizationRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'trancheRatio',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'decimals',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
        ],
        internalType: 'struct DataProviderFacet.PoolData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getProtocolFeeParam',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_valut',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_loanId',
        type: 'uint256',
      },
    ],
    name: 'getRepayment',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'principal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'interest',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'total',
            type: 'uint256',
          },
          {
            internalType: 'uint40',
            name: 'paidAt',
            type: 'uint40',
          },
          {
            internalType: 'bool',
            name: 'isLiquidated',
            type: 'bool',
          },
        ],
        internalType: 'struct RepaymentData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getUserPoolData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'juniorTrancheBalance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'seniorTrancheBalance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'withdrawableSeniorTrancheBalance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'decimals',
            type: 'uint256',
          },
        ],
        internalType: 'struct DataProviderFacet.UserPoolData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getVault',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_collection',
        type: 'address',
      },
    ],
    name: 'pendingSeniorWithdrawals',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
