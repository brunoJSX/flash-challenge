import { gql } from "@apollo/client";

export const CREATE_COMPANY = gql`
  mutation CreateCompany(
    $name: String!
    $tradingName: String!
    $cnpj: String!
    $address: String!
    $chosenBenefits: [String!]!
  ) {
    createCompany(
      name: $name
      tradingName: $tradingName
      cnpj: $cnpj
      address: $address
      chosenBenefits: $chosenBenefits
    ) {
      id
      name
      cnpj
      tradingName
      address
      chosenBenefits
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany(
    $id: String!
    $name: String!
    $tradingName: String!
    $cnpj: String!
    $address: String!
    $chosenBenefits: [String!]!
  ) {
    updateCompany(
      id: $id
      name: $name
      tradingName: $tradingName
      cnpj: $cnpj
      address: $address
      chosenBenefits: $chosenBenefits
    ) {
      id
      name
      cnpj
      tradingName
      address
      chosenBenefits
    }
  }
`;
