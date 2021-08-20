export async function createCompany(_parent, args, { dataSources }) {
  if (!args) {
    throw new Error('Missing company');
  }

  const companyFinded = await dataSources.companiesAPI.findByCnpj(args.cnpj);

  if (companyFinded) {
    throw new Error('Cnpj is already in use');
  }

  return dataSources.companiesAPI.createCompany(args);
}

export async function updateCompany(_parent, args, { dataSources }) {
  return dataSources.companiesAPI.updateCompany(args);
}

export async function findByIdAndDelete(_parent, args, { dataSources }) {
  return dataSources.companiesAPI.findByIdAndDelete(args);
}

export async function getAllCompanies(_parent, _args, { dataSources }) {
  return dataSources.companiesAPI.getAllCompanies();
}

export async function findCompanyById(_parent, { id }, { dataSources }) {
  return dataSources.companiesAPI.findById(id);
}
