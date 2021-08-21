export async function createCompany(_parent, args, { dataSources }) {
  const companyFinded = await dataSources.companiesAPI.findByCnpj(args.cnpj);

  if (companyFinded) {
    throw new Error('Cnpj já está em uso');
  }

  return dataSources.companiesAPI.createCompany(args);
}

export async function updateCompany(_parent, args, { dataSources }) {
  const companyFinded = await dataSources.companiesAPI.findByCnpj(args.cnpj);

  if (companyFinded && companyFinded._id !== args.id) {
    throw new Error('Cnpj já está em uso');
  }

  return dataSources.companiesAPI.updateCompany(args);
}

export async function findByIdAndDelete(_parent, args, { dataSources }) {
  const companyFinded = await dataSources.companiesAPI.findById(args.id);

  if (!companyFinded) {
    throw new Error('Missing company');
  }

  return dataSources.companiesAPI.findByIdAndDelete(args);
}

export async function getAllCompanies(_parent, _args, { dataSources }) {
  return dataSources.companiesAPI.getAllCompanies();
}

export async function findCompanyById(_parent, { id }, { dataSources }) {
  return dataSources.companiesAPI.findById(id);
}
