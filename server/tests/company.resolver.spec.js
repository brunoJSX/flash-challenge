import { createCompany, updateCompany } from '../company/company.resolver';
import CompanyMock from "./company.mock";

let dataSources = {};

describe('company resolvers', () => {
    beforeEach(() => {
        dataSources = { 
            companiesAPI: new CompanyMock() 
        };
    });

    it('should be able to create a new company', async () => {
        const company = await createCompany(null, {
            name: 'AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.',
            tradingName: 'AMAZON.COM.BR',
            cnpj: '15436940000103',
            address: 'Avenida Presidente Juscelino Kubitschek, 2041',
            chosenBenefits: ['vt']
        }, { dataSources });

        expect(company._id).toBeDefined();
    });

    it('should not be able to create a new company with a cnpj already in use', async () => {
        const companyData = {
            name: 'AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.',
            tradingName: 'AMAZON.COM.BR',
            cnpj: '15436940000103',
            address: 'Avenida Presidente Juscelino Kubitschek, 2041',
            chosenBenefits: ['vt']
        };
    
        await createCompany(null, companyData, { dataSources });
    
        await expect(
            createCompany(null, companyData, { dataSources })
        ).rejects.toBeInstanceOf(Error);
    });

    it('should be able to update a company', async () => {
        const company = await createCompany(null, {
            name: 'AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.',
            tradingName: 'AMAZON.COM.BR',
            cnpj: '15436940000103',
            address: 'Avenida Presidente Juscelino Kubitschek, 2041',
            chosenBenefits: ['vt']
        }, { dataSources });

        const companyUpdated = await updateCompany(null, { 
            id: company._id,
            cnpj: '15436940000104',
        }, { dataSources });

        expect(companyUpdated.cnpj).toBe('15436940000104');
    });
});