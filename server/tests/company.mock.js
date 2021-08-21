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
}

export default CompanyMock;