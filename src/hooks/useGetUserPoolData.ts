// import { UserDepositData } from '@graph';
// import { useQuery } from '@tanstack/react-query';
// import { UserPoolData } from '@types';
// import { subgraph } from '@utils/graph';

// export const useUserDepositData = (userAddress: string) => {
//   const { data, ...rest } = useQuery(['userDeposit'], () =>
//     subgraph.getUserPoolData({ id: userAddress.toLowerCase() })
//   );
//   if (!data || !data.userDepositDatas) {
//     return { data: undefined, ...rest };
//   }
//   return {
//     ...rest,
//     data: deserialiseUserDataQueryResult(data.userDepositDatas),
//   };
//   // const { loading, data, error, refetch } = useQuery(GET_USER_DATA, {
//   //   variables: {
//   //     id: userAddress.toLowerCase(),
//   //   },
//   // });
//   // return {
//   //   data,
//   //   loading,
//   //   error,
//   //   refetch,
//   // };
// };

// // export const useGetUserPoolData = (tokenSmb: string) => {
// // const [tokens] = useSupportedTokensCtx();
// // const account = useAccount();
// // const accountAddress = account.address?.toLowerCase();
// // return useQuery(['userReserveData']);

// // const { loading, data, error, refetch } = useQuery(GET_USER_DATA, {
// //   variables: {
// //     depositDataAddress: `${accountAddress}_${tokens[tokenSmb]}`,
// //     address: accountAddress,
// //   },
// //   notifyOnNetworkStatusChange: true,
// // });
// // return {
// //   data: data ? resultToUserPoolData(data) : undefined,
// //   loading,
// //   error,
// //   refetch,
// // };
// // };

// const deserialiseUserDataQueryResult = (
//   data: UserDepositData[]
// ): UserPoolData => {
//   const poolData = data.userData?.depositData
//     ? data.userData.depositData[0]
//     : null;

//   const unbondings = data.userData?.unbondings || [];
//   const decimals = poolData ? Number(poolData.decimals) : 0;
//   return {
//     juniorTrancheBalance: poolData?.juniorTrancheBalance
//       ? shiftDecimals(poolData.juniorTrancheBalance, decimals)
//       : Zero,
//     seniorTrancheBalance: poolData?.seniorTrancheBalance
//       ? shiftDecimals(poolData.seniorTrancheBalance, decimals)
//       : Zero,
//     unbondings: unbondings.map((v: any) => ({
//       amount: shiftDecimals(v.amount, decimals),
//       time: new BigNumber(v.time),
//       type: v.type === 'Senior' ? TrancheType.Senior : TrancheType.Junior,
//     })),
//     withdrawableJuniorBalance: poolData
//       ? shiftDecimals(poolData.withdrawableJuniorBalance, decimals)
//       : Zero,
//     withdrawableSeniorBalance: poolData
//       ? shiftDecimals(poolData.withdrawableSeniorBalance, decimals)
//       : Zero,
//     juniorTranchePnl: poolData?.juniorTranchePnl
//       ? shiftDecimals(poolData.juniorTranchePnl, Number(decimals))
//       : Zero,
//     seniorTranchePnl: poolData?.juniorTranchePnl
//       ? shiftDecimals(poolData.seniorTranchePnl, Number(decimals))
//       : Zero,
//   };
// };

export {};
