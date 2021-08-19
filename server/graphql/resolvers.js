import {
  getAllCompanies,
  createCompany,
  updateCompany,
  findCompanyById,
} from "../company/company.resolver.js";

export const resolvers = {
  Query: {
    getAllCompanies,
    findCompanyById,
  },
  Mutation: {
    createCompany,
    updateCompany,
  },
};
