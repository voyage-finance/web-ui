import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
  query getUserPoolData($depositDataAddress: Bytes, $address: Bytes) {
    userData(id: $address) {
      depositData(where: { id: $depositDataAddress }) {
        juniorTrancheBalance
        juniorTranchePnl
        seniorTrancheBalance
        seniorTranchePnl
        withdrawableJuniorBalance
        withdrawableSeniorBalance
        decimals
      }
      unbondings {
        time
        amount
        type
      }
    }
  }
`;

export const GET_USER_VAULT_POOLS = gql`
  query getUserPoolData($address: Bytes) {
    userData(id: $address) {
      vaults {
        id
        borrowRate
        totalDebt
        totalMargin
        withdrawableSecurityDeposit
        creditLimit
        spendableBalance
        gav
        ltv
        healthFactor
        drawdowns {
          id
          pmt_principal
          pmt_interest
          pmt_payment
          principal
          term
          epoch
          nper
          apr
          borrowAt
          nextPaymentDue
          totalPrincipalPaid
          totalInterestPaid
          paidTimes
        }
      }
    }
  }
`;
