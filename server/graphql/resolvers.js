import {
  getAllCompanies,
  createCompany,
  updateCompany,
  findByIdAndDelete,
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
    findByIdAndDelete,
  },
};
