import { createCompany, findByIdAndDelete, getAllCompanies, updateCompany } from '../company/company.resolver';
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

    it('should not be able to update non-existing company', async () => {
        await expect(
            updateCompany(null, { 
                id: 'non-existing-id',
                cnpj: '15436940000104',
            }, { dataSources })
        ).rejects.toBeInstanceOf(Error);
    });

    it('should not be able to update a company with a cnpj already in use', async () => {
        let company = await createCompany(null, {
            name: 'AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.',
            tradingName: 'AMAZON.COM.BR',
            cnpj: '15436940000103',
            address: 'Avenida Presidente Juscelino Kubitschek, 2041',
            chosenBenefits: ['vt']
        }, { dataSources });

        await createCompany(null, {
            name: 'AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.',
            tradingName: 'AMAZON.COM.BR',
            cnpj: '15436940000104',
            address: 'Avenida Presidente Juscelino Kubitschek, 2041',
            chosenBenefits: ['vt']
        }, { dataSources });

        await expect(
            updateCompany(null, { 
                id: company._id,
                cnpj: '15436940000103',
            }, { dataSources })
        ).resolves.not.toThrow();

        await expect(
            updateCompany(null, { 
                id: company._id,
                cnpj: '15436940000104',
            }, { dataSources })
        ).rejects.toBeInstanceOf(Error);
    });

    it('should be able to delete a company', async () => {
        let company = await createCompany(null, {
            name: 'AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.',
            tradingName: 'AMAZON.COM.BR',
            cnpj: '15436940000103',
            address: 'Avenida Presidente Juscelino Kubitschek, 2041',
            chosenBenefits: ['vt']
        }, { dataSources });

        await createCompany(null, {
            name: 'AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.',
            tradingName: 'AMAZON.COM.BR',
            cnpj: '15436940000104',
            address: 'Avenida Presidente Juscelino Kubitschek, 2041',
            chosenBenefits: ['vt']
        }, { dataSources });

        const companyDeleted = await findByIdAndDelete(
            null, 
            { id: company._id }, 
            { dataSources }
        );
        
        const companies = await getAllCompanies(null, null, { dataSources });

        expect(companyDeleted).toEqual(company);
        expect(companies).toEqual(
            expect.not.arrayContaining([
                expect.objectContaining({
                    _id: company._id
                })
            ])
        );
    });

    it('should not be able to delete non-existing company', async () => {
        await expect(
            findByIdAndDelete(null, { id: 'non-existing-id' }, { dataSources })
        ).rejects.toBeInstanceOf(Error);
    });
});