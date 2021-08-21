import { DataSource } from "apollo-datasource";

export class CompaniesAPI extends DataSource {
  constructor(companyModel) {
    super();
    this.model = companyModel;
  }

  async getAllCompanies() {
    return this.model.find();
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async createCompany(args) {
    return this.model.create(args);
  }

  async updateCompany(args) {
    return this.model.findByIdAndUpdate(
      args.id, 
      { $set: { ...args } },
      { new: true },
    );
  }

  async findByIdAndDelete(args) {
    return this.model.findByAndDelete(args.id);
  }

  async findByCnpj(cnpj) {
    return this.model.findOne({ cnpj });
  }
}
