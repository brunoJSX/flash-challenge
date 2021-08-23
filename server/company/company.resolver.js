export async function createCompany(_parent, args, { dataSources }) {
  const companyFinded = await dataSources.companiesAPI.findByCnpj(args.cnpj);

  if (companyFinded) {
    throw new Error('Cnpj já está em uso');
  }

  return dataSources.companiesAPI.createCompany(args);
}

export async function updateCompany(_parent, args, { dataSources }) {
  const companyToUpdate = await dataSources.companiesAPI.findById(args.id);

  if (!companyToUpdate) {
    throw new Error('Empresa não encontrada');
  }
  
  const companyWithSameCnpj = await dataSources.companiesAPI.findByCnpj(args.cnpj);

  if (
    companyWithSameCnpj && 
    String(companyWithSameCnpj._id) !== String(companyToUpdate._id)
  ) {
    throw new Error('Cnpj já está em uso');
  }

  return dataSources.companiesAPI.updateCompany(args);
}

export async function findByIdAndDelete(_parent, args, { dataSources }) {
  const companyFinded = await dataSources.companiesAPI.findById(args.id);

  if (!companyFinded) {
    throw new Error('Empresa não encontrada');
  }

  return dataSources.companiesAPI.findByIdAndDelete(args);
}

export async function getAllCompanies(_parent, _args, { dataSources }) {
  return dataSources.companiesAPI.getAllCompanies();
}

export async function findCompanyById(_parent, { id }, { dataSources }) {
  return dataSources.companiesAPI.findById(id);
}
