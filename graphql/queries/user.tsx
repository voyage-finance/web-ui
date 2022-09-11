import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
  query getUserPoolData($id: Bytes) {
    userDepositDatas(where: { user: $id }) {
      collection
      juniorTrancheShares
      seniorTrancheShares
    }
  }
`;

export const GET_USER_VAULT = gql`
  query getUserPoolData($address: Bytes) {
    userData(id: $address) {
      vault {
        id
        creditLines {
          id
          borrowRate
          totalDebt
          pool {
            id
            symbol
            decimals
          }
          totalMargin
          marginRequirement
          withdrawableSecurityDeposit
          creditLimit
          spendableBalance
          gav
          ltv
          healthFactor
        }
        loans {
          id
          pool {
            id
            symbol
            decimals
          }
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
