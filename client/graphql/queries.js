import { gql } from "@apollo/client";

export const GET_ALL_COMPANIES = gql`
  query GetAllCompanies {
    getAllCompanies {
      id
      name
      cnpj
      tradingName
      address
      chosenBenefits
    }
  }
`;

export const FIND_COMPANY_BY_ID = gql`
  query FindCompanyById($id: String!) {
    findCompanyById(id: $id) {
      id
      name
      cnpj
      tradingName
      address
      chosenBenefits
    }
  }
`;
