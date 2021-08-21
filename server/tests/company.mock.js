import CompanyModel from "../company/company.model.js";

class CompanyMock {
    companies = [];

    async createCompany(args) {
        const company = new CompanyModel({ ...args });

        this.companies.push(company);

        return company;
    }

    async updateCompany({ id, ...args }) {
        const companyIndex = this.companies.findIndex(c => c._id === id);

        if (companyIndex === -1) {
            return null;
        }

        const company = this.companies[companyIndex];

        Object.assign(company, { ...args });

        this.companies[companyIndex] = company;

        return company;
    }

    async findByCnpj(cnpj) {
        const companyFinded = this.companies.find(c => c.cnpj === cnpj);

        return companyFinded || null;
    }

    async findByIdAndDelete(args) {
        const companyFinded = this.companies.find(c => c._id === args.id);

        if (!companyFinded) {
            return null;
        }

        this.companies = this.companies.filter(c => c._id !== args.id);

        return companyFinded;
    }

    async getAllCompanies() {
        return this.companies;
    }

    async findById(id) {
        const companyFinded = this.companies.find(c => c._id === id);

        return companyFinded || null;
    }
}

export default CompanyMock;